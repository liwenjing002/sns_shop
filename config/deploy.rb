require File.expand_path("../../lib/rvm_cap", __FILE__)

#set :rvm_ruby_string, '1.8.7'
set :rvm_ruby_string, 'ree'
set :rvm_bin_path, "$HOME/bin"
# point to your server
#set :host, '127.0.0.1'
set :host,'50.19.219.48' #北美 
set :db,'leedb.c8znmw6lf4ly.us-east-1.rds.amazonaws.com'
#set :host, '50.19.220.175' #ror
ssh_options[:keys] = ["#{ENV['HOME']}/sns2.pem"]
#ssh_options[:keys] = ["#{ENV['HOME']}/sns_tokyo.pem"]
#ssh_options[:keys] = ["#{ENV['HOME']}/uswest.pem"]
# if you have multiple servers, point these individually
role :web, host
#role :db,  db, :primary => true #北美

role :db,host,:primary=>true
# point to your github fork if you have one
set :repository, "git://github.com/0612800232/sns_shop.git"
set :scm, :git

set :application, 'onebody'
#set :user, 'lee'
set :user,'ubuntu'
set :runner, user
set :repository_cache, 'git_cache'
set :deploy_via, :remote_cache
set :deploy_to, "/var/www/apps/#{application}"
set :copy_exclude, %w(test .git)
set :use_sudo, false
set :rvm_type, :user
