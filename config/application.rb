require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module JamDevcup
  class Application < Rails::Application
    config.facebook = YAML.load_file(Rails.root + "config/facebook.yml")[Rails.env]

    def facebook
      config.facebook
    end
  end
end
