#####################
#   CONFIGURATION   #
#####################
config {
	no_cache = 0
	baseURL = http://www.XXX.de/
	tx_realurl_enable = 1
 #   shortcutIcon = fileadmin/layout/icons/favicon.ico

	doctype = html5
	noPageTitle = 1
	renderCharset = utf-8
	metaCharset = utf-8
	uniqueLinkVars = 1
	pageNotFound_handling = 1
	xhtml_cleaning = all
	htmlTag_setParams = none
	htmlTag_stdWrap {
		setContentToCurrent = 1
		cObject = COA
		cObject {
			10 = LOAD_REGISTER
			10 {
				newLine.char = 10
				tagEnd {
					current = 1
					split.max = 2
					split.token = <html
					split.returnKey = 1
				}
			}
			20 = TEXT
			20.value =<html lang="de"{register:tagEnd}
			20.wrap = |{register:newLine}
			20.insertData = 1

			90 = RESTORE_REGISTER
		}
	}

	removeDefaultJS = external
	inlineStyle2TempFile = 1
	linkVars = L
	sys_language_overlay = hideNonTranslated
	sys_language_mode = content_fallback
	date_stdWrap.strftime = %d. %B %Y
 	time_stdWrap.strftime= %H:%M
	htmlTag_langKey = de
	admPanel = 0
	debug = 0
	cache_period = 43200
	cache_clearAtMidnight = 1
	sendCacheHeaders = 1
	simulateStaticDocuments = 0
	intTarget =
	extTarget =
	disablePrefixComment = 1
}

#####################
#     LANGUAGE      #
#####################
[globalVar = GP:L=1]
	config.sys_language_uid = 0
	config.language = de
	config.locale_all = de_DE.UTF-8
[global]
[globalVar = GP:L=2]
	config.sys_language_uid = 1
	config.language = en
	config.locale_all = en_EN.UTF-8
[global]
# Change <div id="c#"> in <section id="c#">
tt_content.stdWrap.innerWrap.cObject.default {
	10.cObject.default.value = <section id="c{field:uid}"
	20.10.value = csc-default wrapper
	30.cObject.default.value = >|</section>
}

# Ausgabe der Grid Elemente Header
tt_content.gridelements_pi1.10 < lib.stdheader
# Ausgabe der Grid Elemente anpassen
tt_content.gridelements_pi1.20.10.setup {
	# ID des gridelements
	1 < lib.gridelements.defaultGridSetup
	1 {
    	columns {
			# colPos ID
			0 < .default
			0.wrap = <div class="left_50">|</div>
			# colPos ID
			2 < .default
			2.wrap = <div class="middle_img">|</div>
			# colPos ID
			1 < .default
			1.wrap = <div class="right_50">|</div>
		}
		# Optional kann das gesamte Element noch einen wrap bekommen
		wrap = <div class="grid50_img_50">|</div>
	}

	# ID des gridelements
	2 < lib.gridelements.defaultGridSetup
	2 {
    	columns {
			# colPos ID
			0 < .default
			0.wrap = <div class="left_40">|</div>
			# colPos ID
			1 < .default
			1.wrap = <div class="right_60">|</div>
		}
		# Optional kann das gesamte Element noch einen wrap bekommen
		wrap = <div class="grid40_60">|</div>
	}

	# ID des gridelements
	3 < lib.gridelements.defaultGridSetup
	3 {
    	columns {
			# colPos ID
			0 < .default
			0.wrap = <div class="left_60">|</div>
			# colPos ID
			1 < .default
			1.wrap = <div class="right_40">|</div>
		}
		# Optional kann das gesamte Element noch einen wrap bekommen
		wrap = <div class="grid60_40">|</div>
	}

	# ID des gridelements
	4 < lib.gridelements.defaultGridSetup
	4 {
    	columns {
			# colPos ID
			0 < .default
			0.wrap = <div class="left_50">|</div>
			# colPos ID
			1 < .default
			1.wrap = <div class="right_50">|</div>
		}
		# Optional kann das gesamte Element noch einen wrap bekommen
		wrap = <div class="grid50_50">|</div>
	}
}

#####################
#   GOOGLESITEMAP   #
#####################
tx_ddgooglesitemap.forceStartPid = 1
tx_ddgooglesitemap.newsLink = TEXT
tx_ddgooglesitemap.newsLink {
   typolink.forceAbsoluteUrl = 1
   typolink.returnLast = url
   typolink.parameter.field = singlePid
   typolink.additionalParams.cObject = COA
   typolink.additionalParams.cObject {
      10 = TEXT
      10.wrap = &tx_ttnews[tt_news]=|
      10.field = uid
      20 = TEXT
      20.wrap = &tx_ttnews[month]=|
      20.field = datetime
      20.strftime = %m
      30 = TEXT
      30.wrap = &tx_ttnews[year]=|
      30.field = datetime
      30.strftime = %y
   }
}

#####################
#       NEWS        #
#####################
plugin.tt_news._LOCAL_LANG.de.goToArchive = zum Archiv
plugin.tt_news._LOCAL_LANG.de.backToList = Zurück
plugin.tt_news._LOCAL_LANG.de.pi_list_browseresults_page =
plugin.tt_news.displaySingle.image.imageLinkWrap >
plugin.tt_news {
	pageBrowser {
		showResultCount = 0
		showFirstLast = 0
		showRange = 0
		# Leerzeichen zwischen die Seitenzahlen
		disabledLinkWrap = <span>|</span>
		inactiveLinkWrap = |&#32;
		activeLinkWrap  = |&#32;
	}

	displayLatest.subheader_stdWrap.crop = 250 | ... | 1
	displayLatest.subheader_stdWrap.field = bodytext
	displayList.subheader_stdWrap.crop = 150 | ... | 1
	displayList.subheader_stdWrap.field = bodytext

	displayLatest.image.file {
		maxW = 80
		width = 80
		maxH = 80c
		height = 80c
	}
	displayList.image.file < .displayLatest.image.file
}

#####################
#       WIZARD      #
#####################
mod.wizards.newContentElement.wizardItems.common.elements.textpic.tt_content_defValues.imageorient = 17


#####################
# TT_CONTENT LAYOUT #
#####################
tt_content.stdWrap.innerWrap.cObject.default.20 {
10 = CASE
	10 {
		key.field = layout
		default=TEXT
		100 = TEXT
		100.value = header-ce-layout
		101 = TEXT
		101.value = img-bullet-layout
		102 = TEXT
		102.value = map_50-50
	}
}


#####################
# RESPONSIVE IMAGES #
#####################
# tt_content.image.20.maxW = 656
# tt_content.image.20.1.sourceCollection {
# 	small >
# 	smallRetina >
# 	phone {
#  		width = 300
#  		maxW = 300
#  		srcsetCandidate = 480w
#  		mediaQuery = (min-device-width: 320px) and (max-device-width: 480px)
#  		dataKey = phone
#  	}
#  	phoneRetina {
#  		width = 300
#  		maxW = 300
#  		srcsetCandidate = 568w 2x
#  		pixelDensity = 2
#  		mediaQuery = (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2)
#  		dataKey = phoneRetina
#  	}
#  	tablet {
#  		width = 450
#  		maxW = 450
#  		srcsetCandidate = 1024w
#  		mediaQuery = (min-device-width: 768px) and (max-device-width: 1024px)
#  		dataKey = tablet
#  	}
#  	tabletRetina {
# 		width = 350
#  		maxW = 350
#  		srcsetCandidate = 1024w 2x
#  		pixelDensity = 2
#  		mediaQuery = (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)
#  		dataKey = tabletRetina
#  	}
#  	desktop {
# 		width = 656
# 		maxW = 656
#  		srcsetCandidate = 1024w
#  		mediaQuery = screen and (min-width: 1024px)
#  		dataKey = desktop
#  	}
# }