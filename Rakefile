require 'rake'
require 'rake/contrib/ftptools'
require 'rubygems'
require 'highline/import'

$password = ""

def upload_files(path_on_server, path_on_filesystem)
  if $password == ""
    $password = password = ask("Please give me password for ftp!") { |q| q.echo = false }
  end

  Rake::FtpUploader.connect(path_on_server, "inbarush.org", "mikerosoft@inbarush.org", $password) do |ftp|
    ftp.verbose = true;
    ftp.upload_files(path_on_filesystem  + "/*")
  end
end

task :upload_flightscrapper do
  puts(" ====== Uploading Flightscrapper ===== ")
  upload_files("/", "./flightscrapper")
end

task :upload_skyscanner do
  puts(" ====== Uploading Skyscanner =====")
  upload_files("/", "./skyscanner")
end

task :upload_all => [:upload_skyscanner, :upload_flightscrapper] do
end

task :default => :upload_all do
end