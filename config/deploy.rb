require File.expand_path("../../lib/rvm_cap", __FILE__)

set :rvm_ruby_string, 'ree@onebody'

# point to your server
set :host, '127.0.0.1'

# if you have multiple servers, point these individually
role :web, host
role :db,  host, :primary => true

# point to your github fork if you have one
set :repository, "git@github.com:0612800232/sns_shop.git"
set :scm, :git

set :application, 'onebody'
set :user, 'deploy'
set :runner, user
set :repository_cache, 'git_cache'
set :deploy_via, :remote_cache
set :deploy_to, "/var/www/apps/#{application}"
set :copy_exclude, %w(test .git)
set :use_sudo, false
set :rvm_type, :user
