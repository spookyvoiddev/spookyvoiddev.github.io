# Replaces the jekyll-3rd-party-libraries gem, CDN mode only.
#
# It substitutes {{version}} in every third_party_libraries URL from
# _config.yml so the includes can use site.third_party_libraries.<lib>.url.<type>.
# The gem's download: true mode (vendoring libraries into assets/libs) is not
# carried over; it is what pulled in css_parser, whose advisory could not be
# fixed behind the gem's "< 2.0" pin.
Jekyll::Hooks.register :site, :after_init do |site|
  libs = site.config['third_party_libraries'] || {}
  if libs['download']
    raise 'third_party_libraries.download: true is not supported by _plugins/third-party-libraries.rb'
  end

  libs.each do |key, value|
    next if key == 'download' || !value.is_a?(Hash) || !value['url'].is_a?(Hash)

    version = value['version'].to_s
    value['url'].each do |type, url|
      if url.is_a?(Hash)
        url.each do |type2, url2|
          url[type2] = url2.gsub('{{version}}', version) if url2.is_a?(String) && url2.include?('{{version}}')
        end
      elsif url.is_a?(String) && url.include?('{{version}}')
        value['url'][type] = url.gsub('{{version}}', version)
      end
    end
  end
end
