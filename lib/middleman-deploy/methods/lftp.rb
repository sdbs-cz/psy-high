require 'middleman-deploy/methods/base'
require 'shellwords'

module Middleman
  module Deploy
    module Methods
      class Lftp < Base

        attr_reader :clean, :host, :path, :port, :user, :password, :protocol, :flags

        def initialize(server_instance, options={})
          super

          @clean    = self.options.clean
          @host     = escape(self.options.host)
          @path     = escape(self.options.path)
          @user     = escape(self.options.user)
          @password = escape(self.options.password)
          @flags    = self.options.flags
          @protocol = 'ftp'

          if clean
            @flags << ' --delete'
          end
        end

        def process
          fail "build directory does not exists" unless File.exist?(self.server_instance.build_dir)
          build_dir = server_instance.build_dir

          lftp_cmd = ['mirror', '--reverse', flags, build_dir, path].join(' ') + '; quit'
          cmd = ['lftp', '-e', "'#{lftp_cmd}'", target_url]
          exec(cmd.join(' '))
        end

        private
        def target_url
          prefix = ""
          if user
            prefix = "#{user}@"
          end
          if user and password
            prefix = "#{user}:#{password}@"
          end
          "#{protocol}://#{prefix}#{host}"
        end

        def escape(str)
          Shellwords.escape(str)
        end


      end
    end
  end
end
