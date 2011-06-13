class CreateImpressions < ActiveRecord::Migration
  def self.up
    create_table :impressions do |t|
      t.string :name
      t.string :i_type
      t.timestamps
    end
    Impression.create(:name => '喜欢', :i_type => 'Place')
    Impression.create(:name => '不喜欢', :i_type => 'Place')
    Impression.create(:name => '想去', :i_type => 'Place')
    Impression.create(:name => '去过', :i_type => 'Place')
    Impression.create(:name => '喜欢', :i_type => 'Person')
    Impression.create(:name => '不喜欢', :i_type => 'Person')
    Impression.create(:name => '没感觉', :i_type => 'Person')
  end

  def self.down
    drop_table :impressions
  end
end
