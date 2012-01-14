class Search

  ITEMS_PER_PAGE = 100

  attr_accessor :show_businesses, :show_hidden, :testimony, :member
  attr_reader :count, :people, :family_name, :family_barcode_id, :addresses

  def initialize
    @people = []
    @family_name = nil
    @families = []
    @conditions = []
  end

  def name=(name)
    if name
      name.gsub! /\sand\s/, ' & '
      @conditions.add_condition ["(#{sql_concat('people.first_name')} like ? or (#{name.index('&') ? '1=1' : '1=0'}) or (people.first_name like ?))", "%#{name}%", "#{name.split.last}%"]
    end
  end

  def family_name=(family_name)
    @family_name = family_name
    if family_name
      family_name.gsub! /\sand\s/, ' & '
      family_ids = Person.connection.select_values("select distinct family_id from people where #{sql_concat('people.first_name', %q(' '), 'people.first_name')} like #{Person.connection.quote(family_name + '%')} and site_id = #{Site.current.id}").map { |id| id.to_i }
      family_ids = [0] unless family_ids.any?
      @conditions.add_condition ["(families.name like ? or families.first_name like ? or families.id in (?))", "%#{family_name}%", "%#{family_name}%", family_ids]
    end
  end

  def family_barcode_id=(id)
    @family_barcode_id = id
    @conditions.add_condition ["(families.barcode_id = ? or families.alternate_barcode_id = ?)", id, id] if id
  end

  def family_id=(id)
    @conditions.add_condition ["people.family_id = ?", id] if id
  end

  def family=(fam); family_id = fam.id if fam; end

  def business_category=(cat)
    @conditions.add_condition ["people.business_category = ?", cat] if cat
  end

  def gender=(g)
    @conditions.add_condition ["people.gender = ?", g] if g
  end

  def address=(addr)
    addr.symbolize_keys! if addr.respond_to?(:symbolize_keys!)
    addr.reject_blanks!
    @conditions.add_condition(["addresses.hometown_city LIKE ?", "#{addr[:city]}%"],'or') if addr[:city]
    @conditions.add_condition(["addresses.liveing_city LIKE ?", "#{addr[:city]}%"],'or')  if addr[:city]
    @conditions.add_condition(["addresses.current_city LIKE ?", "#{addr[:city]}%"],'or')  if addr[:city]
    
    @conditions.add_condition(["addresses.hometown_province LIKE ?", "#{addr[:province]}%"],'or') if addr[:province]
    @conditions.add_condition(["addresses.liveing_province LIKE ?", "#{addr[:province]}%"],'or')  if addr[:province]
    @conditions.add_condition(["addresses.current_province LIKE ?", "#{addr[:province]}%"],'or')  if addr[:province]

	@conditions.add_condition(["addresses.hometown_address LIKE ?", "#{addr[:address]}%"],'or') if addr[:address]
    @conditions.add_condition(["addresses.liveing_address LIKE ?", "#{addr[:address]}%"],'or')  if addr[:address]
    @conditions.add_condition(["addresses.current_address LIKE ?", "#{addr[:address]}%"],'or')  if addr[:address]

    @search_address = addr.any?
    
  end

  def birthday=(bday)
    bday.symbolize_keys! if bday.respond_to?(:symbolize_keys!)
    bday.reject_blanks!
    @conditions.add_condition ["#{sql_month('people.birthday')} = ?", bday[:month]] if bday[:month]
    @conditions.add_condition ["#{sql_day('people.birthday')} = ?", bday[:day]] if bday[:day]
    @search_birthday = bday.any?
  end

  def anniversary=(ann)
    ann.symbolize_keys! if ann.respond_to?(:symbolize_keys!)
    ann.reject_blanks!
    @conditions.add_condition ["#{sql_month('people.anniversary')} = ?", ann[:month]] if ann[:month]
    @conditions.add_condition ["#{sql_day('people.anniversary')} = ?", ann[:day]] if ann[:day]
    @search_anniversary = ann.any?
  end

  def favorites=(favs)
    favs.reject! { |n, v| not %w(activities interests music tv_shows movies books).include? n.to_s or v.to_s.empty? }
    favs.each do |name, value|
      @conditions.add_condition ["people.#{name.to_s} like ?", "%#{value}%"]
    end
  end

  def type=(type)
    if type
      if %w(member staff deacon elder).include?(type.downcase)
        @type = type.downcase
      else
        @type = type if Person.custom_types.include?(type)
      end
    end
  end

  def query(page=nil, search_by=:person)
    case search_by.to_s
      when 'person'
        query_people(page)
      when 'family'
        query_families(page)
    end
  end

  def query_people(page=nil)
    @conditions.add_condition ["people.deleted = ?", false]
    unless show_hidden and Person.logged_in.admin?(:view_hidden_profiles)
      @conditions.add_condition ["people.visible_to_everyone = ?", true]
      @conditions.add_condition ["(people.visible = ?)",  true]
    end
      if SQLITE
        @conditions.add_condition ["#{sql_now}-people.birthday >= 18"]
      else
        @conditions.add_condition ["DATE_ADD(people.birthday, INTERVAL 18 YEAR) <= CURDATE()"]
      end
    @count = Person.count :conditions => @conditions
    @people = Person.paginate :page => page, :conditions => @conditions,:order =>'first_name'
    
#.select do |person| # additional checks that don't work well in raw sql
#      !person.nil? \
#        and Person.logged_in.sees?(person) \
#        and (not @search_birthday or person.share_birthday_with(Person.logged_in)) \
#        and (not @search_anniversary or person.share_anniversary_with(Person.logged_in)) \
#        and (not @search_address or person.share_address_with(Person.logged_in)) \
#        and (person.adult_or_consent? or (Person.logged_in.admin?(:view_hidden_profiles) and @show_hidden))
#    end
    @people = WillPaginate::Collection.new(page || 1, 30, @count).replace(@people)
  end

  def query_families(page=nil)
    @conditions.add_condition ["families.deleted = ?", false]
    @count = Family.count :conditions => @conditions
    @families = Family.paginate(:all, :page => page, :conditions => @conditions, :order => "first_name")
  end

  def self.new_from_params(params)
    search = new
    search.name = params[:name] || params[:quick_name]
    if params[:family_name] =~ /^\d{10,}$/ # used by checkin dashboard (single text field for both name and barcode)
      search.family_barcode_id = params[:family_name]
    else
      search.family_name = params[:family_name]
      search.family_barcode_id = params[:family_barcode_id]
    end
    search.show_businesses = params[:business] || params[:businesses]
    search.business_category = params[:category]
    search.testimony = params[:testimony]
    search.family_id = params[:family_id]
    search.show_hidden = params[:show_hidden]
    search.birthday = {:month => params[:birthday_month], :day => params[:birthday_day]}
    search.anniversary = {:month => params[:anniversary_month], :day => params[:anniversary_day]}
    search.gender = params[:gender]
    search.address = params.reject { |k, v| not %w(city province address).include? k }
    search.type = params[:type]
    search.favorites = params.reject { |k, v| not %w(activities interests music tv_shows movies books).include? k }
    search.show_hidden = true if params[:select_person] and Person.logged_in.admin?(:view_hidden_profiles)
    search
  end
end
