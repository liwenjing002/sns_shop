# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111216125330) do

  create_table "activities", :force => true do |t|
    t.string   "name"
    t.datetime "activity_time"
    t.string   "location"
    t.datetime "apply_time"
    t.string   "charge_people"
    t.string   "charge_phone"
    t.string   "lasting_time"
    t.string   "activity_spend"
    t.text     "activity_memo"
    t.integer  "create_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "admins", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
    t.string   "template_name", :limit => 100
    t.text     "flags"
    t.boolean  "super_admin",                  :default => false
  end

  add_index "admins", ["site_id"], :name => "index_site_id_on_admins"

  create_table "admins_reports", :id => false, :force => true do |t|
    t.integer "admin_id"
    t.integer "report_id"
  end

  create_table "albums", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "person_id"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "group_id"
    t.boolean  "is_public",   :default => false
    t.integer  "place_id"
  end

  create_table "attachments", :force => true do |t|
    t.integer  "message_id"
    t.string   "name"
    t.string   "content_type",      :limit => 50
    t.datetime "created_at"
    t.integer  "site_id"
    t.integer  "page_id"
    t.integer  "group_id"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.string   "file_fingerprint",  :limit => 50
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  create_table "attendance_records", :force => true do |t|
    t.integer  "site_id"
    t.integer  "person_id"
    t.integer  "group_id"
    t.datetime "attended_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "family_name"
    t.string   "age"
    t.string   "can_pick_up",    :limit => 100
    t.string   "cannot_pick_up", :limit => 100
    t.string   "medical_notes",  :limit => 200
  end

  add_index "attendance_records", ["attended_at"], :name => "index_attended_at_on_attendance_records"
  add_index "attendance_records", ["group_id"], :name => "index_group_id_on_attendance_records"
  add_index "attendance_records", ["person_id"], :name => "index_person_id_on_attendance_records"
  add_index "attendance_records", ["site_id"], :name => "index_site_id_on_attendance_records"

  create_table "comments", :force => true do |t|
    t.integer  "verse_id"
    t.integer  "person_id"
    t.text     "text"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "recipe_id"
    t.integer  "news_item_id"
    t.integer  "song_id"
    t.integer  "note_id"
    t.integer  "site_id"
    t.integer  "picture_id"
    t.integer  "place_share_id"
    t.integer  "activity_id"
    t.integer  "video_id"
  end

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0
    t.integer  "attempts",   :default => 0
    t.text     "handler"
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], :name => "delayed_jobs_priority"

  create_table "dreams", :force => true do |t|
    t.string   "name"
    t.string   "desc"
    t.text     "detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "emails", :force => true do |t|
    t.string   "from"
    t.string   "to"
    t.integer  "last_send_attempt", :default => 0
    t.text     "mail"
    t.datetime "created_on"
  end

  create_table "feeds", :force => true do |t|
    t.integer  "person_id"
    t.string   "name",        :limit => 100
    t.string   "url",         :limit => 1000
    t.integer  "site_id"
    t.integer  "error_count",                 :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_url",    :limit => 1000
  end

  create_table "friendship_requests", :force => true do |t|
    t.integer  "person_id"
    t.integer  "from_id"
    t.boolean  "rejected",   :default => false
    t.datetime "created_at"
    t.integer  "site_id"
  end

  add_index "friendship_requests", ["person_id"], :name => "index_friendship_requests_on_person_id"

  create_table "friendships", :force => true do |t|
    t.integer  "person_id"
    t.integer  "friend_id"
    t.datetime "created_at"
    t.integer  "ordering",   :default => 1000
    t.integer  "site_id"
  end

  add_index "friendships", ["friend_id"], :name => "index_friendships_on_friend_id"
  add_index "friendships", ["person_id"], :name => "index_friendships_on_person_id"

  create_table "generated_files", :force => true do |t|
    t.integer  "site_id"
    t.integer  "job_id"
    t.integer  "person_id"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.string   "file_fingerprint",  :limit => 50
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", :force => true do |t|
    t.string   "name",                      :limit => 100
    t.text     "description"
    t.string   "meets",                     :limit => 100
    t.string   "location",                  :limit => 100
    t.text     "directions"
    t.text     "other_notes"
    t.string   "category",                  :limit => 50
    t.integer  "creator_id"
    t.boolean  "private",                                  :default => false
    t.string   "address"
    t.boolean  "members_send",                             :default => true
    t.integer  "leader_id"
    t.datetime "updated_at"
    t.boolean  "hidden",                                   :default => false
    t.boolean  "approved",                                 :default => false
    t.string   "link_code"
    t.integer  "parents_of"
    t.integer  "site_id"
    t.boolean  "blog",                                     :default => true
    t.boolean  "email",                                    :default => true
    t.boolean  "prayer",                                   :default => true
    t.boolean  "attendance",                               :default => true
    t.integer  "legacy_id"
    t.string   "gcal_private_link"
    t.boolean  "approval_required_to_join",                :default => false
    t.boolean  "pictures",                                 :default => true
    t.string   "cm_api_list_id",            :limit => 50
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.string   "photo_fingerprint",         :limit => 50
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "groups", ["category"], :name => "index_groups_on_category"
  add_index "groups", ["site_id"], :name => "index_site_id_on_groups"

  create_table "impressions", :force => true do |t|
    t.string   "name"
    t.string   "i_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "jobs", :force => true do |t|
    t.integer  "site_id"
    t.string   "command"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "log_items", :force => true do |t|
    t.string   "name"
    t.text     "object_changes"
    t.integer  "person_id"
    t.integer  "group_id"
    t.datetime "created_at"
    t.datetime "reviewed_on"
    t.integer  "reviewed_by"
    t.datetime "flagged_on"
    t.string   "flagged_by"
    t.boolean  "deleted",        :default => false
    t.integer  "site_id"
    t.integer  "loggable_id"
    t.string   "loggable_type"
  end

  add_index "log_items", ["created_at"], :name => "index_log_items_on_created_at"
  add_index "log_items", ["flagged_on"], :name => "index_log_items_on_flagged_on"
  add_index "log_items", ["group_id"], :name => "index_log_items_on_group_id"
  add_index "log_items", ["loggable_id"], :name => "index_log_items_on_loggable_id"
  add_index "log_items", ["loggable_type"], :name => "index_log_items_on_loggable_type"
  add_index "log_items", ["person_id"], :name => "index_log_items_on_person_id"
  add_index "log_items", ["reviewed_on"], :name => "index_log_items_on_reviewed_on"
  add_index "log_items", ["site_id"], :name => "index_log_items_on_site_id"

  create_table "maps", :force => true do |t|
    t.string   "center_latitude"
    t.string   "center_longitude"
    t.integer  "zoom"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "person_id"
  end

  create_table "marker_to_maps", :force => true do |t|
    t.integer "map_id"
    t.integer "marker_id"
    t.string  "marker_type"
  end

  create_table "markers", :force => true do |t|
    t.text     "marker_html"
    t.decimal  "marker_latitude",  :precision => 15, :scale => 12
    t.decimal  "marker_longitude", :precision => 15, :scale => 12
    t.string   "privaty"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "object_type"
    t.integer  "object_id"
    t.string   "geocode_position"
    t.integer  "owner_id"
    t.string   "travel_type"
    t.string   "destin_position"
    t.string   "destin_latitude"
    t.string   "destin_longitude"
  end

  create_table "membership_requests", :force => true do |t|
    t.integer  "person_id"
    t.integer  "group_id"
    t.datetime "created_at"
    t.integer  "site_id"
  end

  create_table "memberships", :force => true do |t|
    t.integer  "group_id"
    t.integer  "person_id"
    t.boolean  "admin",              :default => false
    t.boolean  "get_email",          :default => true
    t.boolean  "share_address",      :default => false
    t.boolean  "share_mobile_phone", :default => false
    t.boolean  "share_work_phone",   :default => false
    t.boolean  "share_fax",          :default => false
    t.boolean  "share_email",        :default => false
    t.boolean  "share_birthday",     :default => false
    t.boolean  "share_anniversary",  :default => false
    t.datetime "updated_at"
    t.integer  "code"
    t.integer  "site_id"
    t.integer  "legacy_id"
    t.boolean  "share_home_phone",   :default => false
    t.boolean  "auto",               :default => false
    t.integer  "place_id"
  end

  add_index "memberships", ["group_id"], :name => "index_memberships_on_group_id"
  add_index "memberships", ["person_id"], :name => "index_memberships_on_person_id"

  create_table "messages", :force => true do |t|
    t.integer  "group_id"
    t.integer  "person_id"
    t.integer  "to_person_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parent_id"
    t.string   "subject"
    t.text     "body"
    t.boolean  "share_email",  :default => false
    t.integer  "wall_id"
    t.integer  "code"
    t.integer  "site_id"
    t.text     "html_body"
  end

  add_index "messages", ["created_at"], :name => "index_messages_on_created_at"
  add_index "messages", ["wall_id"], :name => "index_messages_on_wall_id"

  create_table "news_items", :force => true do |t|
    t.string   "title"
    t.string   "link"
    t.text     "body"
    t.datetime "published"
    t.boolean  "active",     :default => true
    t.integer  "site_id"
    t.string   "source"
    t.integer  "person_id"
    t.integer  "sequence"
    t.datetime "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notes", :force => true do |t|
    t.integer  "person_id"
    t.string   "title"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "original_url"
    t.integer  "group_id"
    t.integer  "site_id"
    t.string   "location"
    t.string   "destination"
    t.integer  "stream_item_id"
    t.integer  "marker_at_id"
    t.integer  "marker_to_id"
    t.string   "latitude"
    t.string   "longitude"
  end

  create_table "pages", :force => true do |t|
    t.string   "slug"
    t.string   "title"
    t.text     "body"
    t.integer  "parent_id"
    t.string   "path"
    t.boolean  "published",  :default => true
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "navigation", :default => true
    t.boolean  "system",     :default => false
    t.boolean  "raw",        :default => false
  end

  add_index "pages", ["parent_id"], :name => "index_pages_on_parent_id"
  add_index "pages", ["path"], :name => "index_pages_on_path"

  create_table "people", :force => true do |t|
    t.integer  "legacy_id"
    t.integer  "sequence"
    t.string   "gender",                       :limit => 6
    t.string   "first_name"
    t.datetime "birthday"
    t.string   "email"
    t.boolean  "email_changed",                                :default => false
    t.string   "website"
    t.text     "classes"
    t.string   "shepherd"
    t.string   "mail_group",                   :limit => 1
    t.string   "encrypted_password",           :limit => 100
    t.text     "love_activities"
    t.text     "interests"
    t.text     "music"
    t.text     "tv_shows"
    t.text     "movies"
    t.text     "books"
    t.text     "quotes"
    t.text     "about"
    t.text     "testimony"
    t.datetime "anniversary"
    t.datetime "updated_at"
    t.string   "alternate_email"
    t.integer  "email_bounces",                                :default => 0
    t.string   "business_category",            :limit => 100
    t.boolean  "get_wall_email",                               :default => true
    t.boolean  "account_frozen",                               :default => false
    t.boolean  "wall_enabled"
    t.boolean  "messages_enabled",                             :default => true
    t.string   "business_address"
    t.string   "flags"
    t.boolean  "visible",                                      :default => true
    t.string   "parental_consent"
    t.integer  "admin_id"
    t.boolean  "friends_enabled",                              :default => true
    t.boolean  "member",                                       :default => false
    t.boolean  "staff",                                        :default => false
    t.boolean  "elder",                                        :default => false
    t.boolean  "deacon",                                       :default => false
    t.boolean  "can_sign_in",                                  :default => false
    t.boolean  "visible_to_everyone",                          :default => false
    t.boolean  "visible_on_printed_directory",                 :default => false
    t.boolean  "full_access",                                  :default => false
    t.integer  "legacy_family_id"
    t.string   "feed_code",                    :limit => 50
    t.integer  "site_id"
    t.string   "api_key",                      :limit => 50
    t.string   "salt",                         :limit => 50
    t.boolean  "deleted",                                      :default => false
    t.string   "custom_type",                  :limit => 100
    t.text     "custom_fields"
    t.string   "can_pick_up",                  :limit => 100
    t.string   "cannot_pick_up",               :limit => 100
    t.string   "medical_notes",                :limit => 200
    t.string   "relationships_hash",           :limit => 40
    t.integer  "donortools_id"
    t.boolean  "synced_to_donortools",                         :default => false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.string   "photo_fingerprint",            :limit => 50
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "description",                  :limit => 25
    t.boolean  "share_address",                                :default => true
    t.string   "qq"
    t.string   "msn"
    t.string   "weibo"
    t.string   "twitter"
    t.integer  "privacy_id"
    t.boolean  "gmaps"
    t.string   "home_address"
    t.string   "city",                         :limit => 3000
  end

  add_index "people", ["admin_id"], :name => "index_admin_id_on_people"
  add_index "people", ["business_category"], :name => "index_business_category_on_people"
  add_index "people", ["privacy_id"], :name => "index_privacy_id_on_people"
  add_index "people", ["site_id"], :name => "index_site_id_on_people"

  create_table "people_activities", :force => true do |t|
    t.integer  "activity_id"
    t.integer  "person_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
  end

  create_table "people_verses", :id => false, :force => true do |t|
    t.integer "person_id"
    t.integer "verse_id"
  end

  create_table "person_impressions", :force => true do |t|
    t.integer  "person_id"
    t.integer  "impression_id"
    t.string   "object_type"
    t.integer  "object_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pictures", :force => true do |t|
    t.integer  "person_id"
    t.datetime "created_at"
    t.boolean  "cover",                              :default => false
    t.datetime "updated_at"
    t.integer  "site_id"
    t.integer  "album_id"
    t.string   "original_url",       :limit => 1000
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.string   "photo_fingerprint",  :limit => 50
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "type"
    t.text     "photo_text"
    t.string   "location"
    t.string   "destination"
    t.string   "stream_item_id"
    t.string   "latitude"
    t.string   "longitude"
  end

  add_index "pictures", ["album_id"], :name => "index_pictures_on_album_id"

  create_table "place_shares", :force => true do |t|
    t.string   "text"
    t.integer  "picture_id"
    t.integer  "stream_item_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_public"
    t.string   "share_type"
    t.integer  "place_id"
  end

  create_table "places", :force => true do |t|
    t.string   "place_name"
    t.string   "place_type"
    t.string   "place_latitude"
    t.string   "place_longitude"
    t.text     "place_description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_public"
    t.string   "full_address"
    t.integer  "picture_id"
    t.integer  "marker_id"
    t.integer  "person_id"
    t.integer  "stream_item_id"
  end

  create_table "plans", :force => true do |t|
    t.datetime "day"
    t.string   "province"
    t.string   "city"
    t.string   "county"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "person_id"
    t.integer  "days_num"
    t.string   "travel_way"
    t.string   "accommodation"
    t.string   "food_taste"
    t.string   "play_interesting"
    t.string   "play_way"
  end

  create_table "postitions", :force => true do |t|
    t.decimal  "current_latitude",  :precision => 15, :scale => 12
    t.decimal  "current_longitude", :precision => 15, :scale => 12
    t.string   "current_address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "person_id"
  end

  create_table "prayer_requests", :force => true do |t|
    t.integer  "group_id"
    t.integer  "person_id"
    t.text     "request"
    t.text     "answer"
    t.datetime "answered_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
  end

  create_table "prayer_signups", :force => true do |t|
    t.integer  "person_id"
    t.datetime "start"
    t.datetime "created_at"
    t.boolean  "reminded",                  :default => false
    t.string   "other_name", :limit => 100
    t.integer  "site_id"
  end

  create_table "privacies", :force => true do |t|
    t.boolean  "share_all_basic"
    t.boolean  "share_all_address"
    t.boolean  "share_all_about"
    t.boolean  "share_all_company"
    t.boolean  "share_all_activity"
    t.boolean  "share_all_ablums"
    t.boolean  "share_all_visible"
    t.boolean  "share_friend_basic"
    t.boolean  "share_friend_address"
    t.boolean  "share_friend_about"
    t.boolean  "share_friend_company"
    t.boolean  "share_friend_activity"
    t.boolean  "share_friend_ablums"
    t.boolean  "share_friend_visible"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "processed_messages", :force => true do |t|
    t.string   "header_message_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "publications", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.string   "file"
    t.datetime "updated_at"
    t.integer  "site_id"
    t.integer  "person_id"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.string   "file_fingerprint",  :limit => 50
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  create_table "recipes", :force => true do |t|
    t.integer  "person_id"
    t.string   "title"
    t.text     "notes"
    t.text     "description"
    t.text     "ingredients"
    t.text     "directions"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "prep"
    t.string   "bake"
    t.integer  "serving_size"
    t.integer  "site_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.string   "photo_fingerprint",  :limit => 50
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  create_table "relationships", :force => true do |t|
    t.integer  "person_id"
    t.integer  "related_id"
    t.string   "name"
    t.string   "other_name"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reports", :force => true do |t|
    t.integer  "site_id"
    t.string   "name"
    t.text     "definition"
    t.boolean  "restricted",     :default => true
    t.integer  "created_by_id"
    t.integer  "run_count",      :default => 0
    t.datetime "last_run_at"
    t.integer  "last_run_by_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "service_categories", :force => true do |t|
    t.string  "name",        :null => false
    t.text    "description"
    t.integer "site_id"
  end

  create_table "services", :force => true do |t|
    t.integer  "person_id",                                  :null => false
    t.integer  "service_category_id",                        :null => false
    t.string   "status",              :default => "current", :null => false
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id"
    t.text     "data"
    t.datetime "updated_at"
    t.datetime "created_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"

  create_table "settings", :force => true do |t|
    t.string   "section",     :limit => 100
    t.string   "name",        :limit => 100
    t.string   "format",      :limit => 20
    t.string   "value",       :limit => 500
    t.string   "description", :limit => 500
    t.boolean  "hidden",                     :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
    t.boolean  "global",                     :default => false
  end

  create_table "shares", :force => true do |t|
    t.integer  "shareable_id"
    t.string   "shareable_type"
    t.integer  "share_order"
    t.integer  "share_title"
    t.boolean  "is_out"
    t.string   "out_url"
    t.string   "out_img"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
  end

  create_table "signin_failures", :force => true do |t|
    t.string   "email"
    t.string   "ip"
    t.datetime "created_at"
  end

  create_table "sites", :force => true do |t|
    t.string   "name"
    t.string   "host"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "secondary_host"
    t.integer  "max_admins"
    t.integer  "max_people"
    t.integer  "max_groups"
    t.boolean  "import_export_enabled",               :default => true
    t.boolean  "pages_enabled",                       :default => true
    t.boolean  "pictures_enabled",                    :default => true
    t.boolean  "publications_enabled",                :default => true
    t.boolean  "active",                              :default => true
    t.boolean  "twitter_enabled",                     :default => false
    t.string   "external_guid",                       :default => "0"
    t.datetime "settings_changed_at"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.string   "logo_fingerprint",      :limit => 50
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
  end

  add_index "sites", ["host"], :name => "index_sites_on_host"

  create_table "stream_items", :force => true do |t|
    t.integer  "site_id"
    t.string   "title",           :limit => 500
    t.text     "body"
    t.text     "context"
    t.integer  "person_id"
    t.integer  "group_id"
    t.integer  "streamable_id"
    t.string   "streamable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "wall_id"
    t.boolean  "shared"
    t.boolean  "text",                           :default => false
    t.integer  "marker_id"
  end

  add_index "stream_items", ["created_at"], :name => "index_stream_items_on_created_at"
  add_index "stream_items", ["group_id"], :name => "index_stream_items_on_group_id"
  add_index "stream_items", ["person_id"], :name => "index_stream_items_on_person_id"
  add_index "stream_items", ["streamable_type", "streamable_id"], :name => "index_stream_items_on_streamable_type_and_streamable_id"

  create_table "sync_items", :force => true do |t|
    t.integer "site_id"
    t.integer "sync_id"
    t.integer "syncable_id"
    t.string  "syncable_type"
    t.integer "legacy_id"
    t.string  "name"
    t.string  "operation",      :limit => 50
    t.string  "status",         :limit => 50
    t.text    "error_messages"
  end

  add_index "sync_items", ["sync_id"], :name => "index_sync_id_on_sync_items"
  add_index "sync_items", ["syncable_type", "syncable_id"], :name => "index_syncable_on_sync_items"

  create_table "syncs", :force => true do |t|
    t.integer  "site_id"
    t.integer  "person_id"
    t.boolean  "complete",      :default => false
    t.integer  "success_count"
    t.integer  "error_count"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "started_at"
    t.datetime "finished_at"
  end

  create_table "tag_to_tags", :force => true do |t|
    t.integer "tag_from_id"
    t.integer "tag_to_id"
  end

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type"], :name => "index_taggings_on_taggable_id_and_taggable_type"

  create_table "tags", :force => true do |t|
    t.string   "name",       :limit => 50
    t.datetime "updated_at"
    t.string   "tag_type"
  end

  create_table "twitter_messages", :force => true do |t|
    t.integer  "twitter_screen_name"
    t.integer  "person_id"
    t.string   "message",             :limit => 140
    t.string   "reply",               :limit => 140
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
    t.string   "twitter_message_id"
  end

  create_table "updates", :force => true do |t|
    t.integer  "person_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "home_phone",       :limit => 25
    t.string   "mobile_phone",     :limit => 25
    t.string   "work_phone",       :limit => 25
    t.string   "fax",              :limit => 25
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.string   "state",            :limit => 2
    t.string   "zip",              :limit => 10
    t.datetime "birthday"
    t.datetime "anniversary"
    t.datetime "created_at"
    t.boolean  "complete",                       :default => false
    t.string   "suffix",           :limit => 25
    t.string   "gender",           :limit => 6
    t.string   "family_name"
    t.string   "family_last_name"
    t.integer  "site_id"
    t.text     "custom_fields"
  end

  add_index "updates", ["person_id"], :name => "index_updates_on_person_id"

  create_table "verifications", :force => true do |t|
    t.string   "email"
    t.string   "mobile_phone", :limit => 25
    t.integer  "code"
    t.boolean  "verified"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "site_id"
  end

  create_table "verses", :force => true do |t|
    t.string   "reference",   :limit => 50
    t.text     "text"
    t.string   "translation", :limit => 10
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "book"
    t.integer  "chapter"
    t.integer  "verse"
    t.integer  "site_id"
  end

  create_table "videos", :force => true do |t|
    t.string   "name"
    t.text     "desc"
    t.string   "video_url"
    t.string   "screenshots_url"
    t.integer  "person_id"
    t.string   "location"
    t.string   "longitude"
    t.string   "latitude"
    t.integer  "marker_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "stream_item_id"
  end

end
