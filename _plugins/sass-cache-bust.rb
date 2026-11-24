# Cache-busting version for the compiled main.css.
#
# The jekyll-cache-bust gem's `bust_css_cache` hashes `assets/_sass/**`, but
# this site keeps its partials in `_sass/`, so the gem hashed nothing and
# every deploy got the same `?v=` (the MD5 of an empty string). Browsers then
# kept serving a stale main.css after style changes.
#
# `bust_sass_cache` hashes the real sources: every file under `_sass/` plus
# `assets/css/main.scss`, read in a stable order.
require "digest/md5"

module Jekyll
  module SassCacheBust
    SOURCES = ["_sass/**/*", "assets/css/main.scss"].freeze

    def bust_sass_cache(file_name)
      site_source = @context.registers[:site].source
      files = SOURCES.flat_map { |pattern| Dir[File.join(site_source, pattern)] }
                     .select { |path| File.file?(path) }
                     .sort
      digest = Digest::MD5.new
      files.each { |path| digest << path.delete_prefix(site_source) << File.binread(path) }
      "#{file_name}?v=#{digest.hexdigest}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::SassCacheBust)
