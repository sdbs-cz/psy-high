# Website for Psy-High 2015

See it live [in English](http://www.psy-high.en/2015/) and [in Czech](http://www.psy-high.cz/2015/).

## Development

### Requirements

* Ruby 2.0+
* Bundler
* lftp (for deployment)

### Setup

Run `bundle`.

### Development Server

Run `middleman`. The server should start on `localhost:4567` with Czech locale as default. English version is available in the `en` subfolder, i.e. `localhost:4567/en`.

### Building

Run `middleman build` to generate development build.

Set `BUILD_LANG` environment variable either to `cs` or `en` to generate actual build for Czech or English version respectively, e.g.:

```
BUILD_LANG=en middleman build
```

### Deployment

Set the following environment variables:

* FTP_HOST
* FTP_USER
* FTP_PASSWORD

Files are uploaded to `/cz/2015` (Czech) or `/eu/2015` (English) folders respectively.

Either Czech or English version is deployed, depending on `BUILD_LANG` environment variable, for example:

```
BUILD_LANG=en middleman deploy
```

will build and deploy English version. That means you actually need to run deploy twice to update both sites:

```
BUILD_LANG=en middleman deploy && BUILD_LANG=cs middleman deploy
```

#### LFTP Certificate Error

In case you get error like `Fatal error: Certificate verification`, [disable lftp certificate verification](https://serverfault.com/questions/411970/how-to-avoid-lftp-certificate-verification-error), e.g.:

```
echo "set ssl:verify-certificate no" >> ~/.lftprc
```

### Bands Data

There is `lib/bands_data.rb` script to generate YAML from the source CSV sheet. The results are stored in `data/bands.yml`.
