class CreatePersonImpressions < ActiveRecord::Migration
  def self.up
    create_table :person_impressions do |t|
      t.references :person
      t.references :impression
      t.string :object_type #印象对象 如place或者PEOPLE
      t.integer :object_id
      t.timestamps
    end
  end

  def self.down
    drop_table :person_impressions
  end
end
