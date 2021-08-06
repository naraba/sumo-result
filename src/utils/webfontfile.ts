/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
// from https://gist.github.com/supertommy/bc728957ff7dcb8016da68b04d3a2768

import Phaser from 'phaser'

import * as WebFontLoader from 'webfontloader'

// https://photonstorm.github.io/phaser3-docs/Phaser.Loader.File.html
export default class WebFontFile extends Phaser.Loader.File
{
    private fontNames: string[]
    private service: string
    private fontsLoadedCount: number

	/**
	 * @param {Phaser.Loader.LoaderPlugin} loader
	 * @param {string | string[]} fontNames
	 * @param {string} [service]
	 */
	constructor(loader, fontNames, service = 'google')
	{
		super(loader, {
			type: 'webfont',
			key: fontNames.toString(),
		})

		this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames]
		this.service = service

		this.fontsLoadedCount = 0
	}

	load()
	{
		const config = {
			fontactive: (familyName) => {
				this.checkLoadedFonts(familyName)
			},
			fontinactive: (familyName) => {
				this.checkLoadedFonts(familyName)
			}
		}

		switch (this.service)
		{
			case 'google':
				config[this.service] = this.getGoogleConfig()
				break

			case 'adobe-edge':
				config['typekit'] = this.getAdobeEdgeConfig()
				break

			default:
				throw new Error('Unsupported font service')
		}
		
		WebFontLoader.load(config)
	}

	getGoogleConfig()
	{
		return {
			families: this.fontNames
		}
	}

	getAdobeEdgeConfig()
	{
		return {
			id: this.fontNames.join(';'),
			api: '//use.edgefonts.net'
		}
	}

	checkLoadedFonts(familyName)
	{
		if (this.fontNames.indexOf(familyName) < 0)
		{
			return
		}

		++this.fontsLoadedCount
		if (this.fontsLoadedCount >= this.fontNames.length)
		{
			this.loader.nextFile(this, true)
		}
	}
}
