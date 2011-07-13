class Location::ImpressionsController < ApplicationController
  # GET /impressions
  # GET /impressions.xml
  def index
    @impressions = Impression.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @impressions }
    end
  end

  # GET /impressions/1
  # GET /impressions/1.xml
  def show
    @impression = Impression.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @impression }
    end
  end

  # GET /impressions/new
  # GET /impressions/new.xml
  def new
    @impression = Impression.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @impression }
    end
  end

  # GET /impressions/1/edit
  def edit
    @impression = Impression.find(params[:id])
  end

  # POST /impressions
  # POST /impressions.xml
  def create
    @impression = Impression.new(params[:impression])

    respond_to do |format|
      if @impression.save
        format.html { redirect_to(@impression, :notice => 'Impression was successfully created.') }
        format.xml  { render :xml => @impression, :status => :created, :location => @impression }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @impression.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /impressions/1
  # PUT /impressions/1.xml
  def update
    @impression = Impression.find(params[:id])

    respond_to do |format|
      if @impression.update_attributes(params[:impression])
        format.html { redirect_to(@impression, :notice => 'Impression was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @impression.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /impressions/1
  # DELETE /impressions/1.xml
  def destroy
    @impression = Impression.find(params[:id])
    @impression.destroy

    respond_to do |format|
      format.html { redirect_to(impressions_url) }
      format.xml  { head :ok }
    end
  end
end
