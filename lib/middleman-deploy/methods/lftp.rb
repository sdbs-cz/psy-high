require 'middleman-deploy/methods/base'

module Middleman
  module Deploy
    module Methods
      class Lftp < Base

        attr_reader :clean, :host, :path, :port, :user, :password, :protocol

        def initialize(server_instance, options={})
          super

          @clean    = self.options.clean
          @host     = self.options.host
          @path     = self.options.path
          @port     = self.options.port
          @user     = self.options.user
          @password = self.options.password
          @protocol = 'ftp'
        end

        def process
          user = @user
          pass = @password
          # Append "@" to user if provided.
          if user && !user.empty?
            if pass && !pass.empty?
              user = "#{user}:"
              pass = "#{pass}@"
            else
              user = "#{user}@"
            end
          end

          dest_url = "#{@protocol}://#{user}#{pass}#{@host}"

          puts "## Deploying via lftp to #{dest_url}"

          fail "build directory does not exists" unless File.exist?(self.server_instance.build_dir)

          command = <<-END
            lftp -c "set ftp:list-options -a;
                     set cmd:fail-exit yes;
                     set ssl:verify-certificate false;
                     open '#{dest_url}';
                     lcd #{self.server_instance.build_dir};
                     cd #{@path};
                     mirror --reverse #{@clean ? '--delete' : ''} --verbose;"
          END
          exec command
        end
      end
    end
  end
end
