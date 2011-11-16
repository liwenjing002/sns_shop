require File.expand_path("../../lib/rvm_cap", __FILE__)

#set :rvm_ruby_string, '1.8.7'
set :rvm_ruby_string, 'ree-1.8.7-2011.03'
set :rvm_bin_path, "$HOME/.rvm/bin"
# point to your server
#set :host, '127.0.0.1'
set :host,'106.187.47.151' #北美 
role :db,host,:primary=>true
#ssh_options[:keys] = ["#{ENV['HOME']}/sns.pem"]

# if you have multiple servers, point these individually
role :web, host

# point to your github fork if you have one
set :repository, "git://github.com/0612800232/sns_shop.git"
set :scm, :git

set :application, 'onebody'
#set :user, 'lee'
set :user,'lee'
set :runner, user
set :repository_cache, 'git_cache'
set :deploy_via, :remote_cache
set :deploy_to, "/code/apps/#{application}"
set :copy_exclude, %w(test .git)
set :use_sudo, false
set :rvm_type, :user