lib.headerSlider = FILES
lib.headerSlider {
	# stellt Verbindung zur Tabelle her, in welcher die Bilder gespeichert sind
	references {
		# Tabelle in der die Seiten gespeichert sind
		table = pages
		# Feld in Tabelle pages, welches die Reference enthält
		fieldName = media
		# levelmedia sagt, dass die Daten aus dem media-Feld genommen werden sollen
		# -1 steht dafür, dass ab der aktuellen Seite gesucht wird
		# -2 würde bedeuten, dass ab der darüberliegenden Seite gesucht wird
		# slide das immer eine Navigationsebene höher nach Bildern gesucht werden soll, bis eines gefunden wurde
		data = levelmedia:0
	}

	renderObj = COA
	renderObj {
		# IMAGE-Objekt in Abarbeitungsebene 10 erstellen
		10 = IMAGE
		10 {
			file {
				import {
					# Pfad zum Bild auslesen
					data = file:current:publicUrl
				}

				# Breiten- und Höhenangaben für das Bildrendering angeben
				# (c = cut: auf diese Höhe zuschneiden)
				width = 1024c
				height = 530
			}

			# ALT-Tag des Bildes mit dem Beschreibungstext befüllen
			altText.data = file:current:description

			# ALT-Tag des Bildes mit dem Title befüllen (Optional)
			altText.data = file:current:title
		}

		20 = TEXT
		20 {
			stdWrap.wrap = <span class="image-caption">|</span>
			data = file:current:description
		}
		# um das Bild herum LI-Tags bauen
		wrap = <li>|</li>
	}

	stdWrap {
		# um alles gerenderte zum Schluss noch ein UL-Tag
		wrap = <ul class="images">|</ul>
	}
}

temp.BLswitcher = CASE
temp.BLswitcher {
	key.field = backend_layout
	key.ifEmpty.data = levelfield:-2, backend_layout_next_level, slide
	1 = COA
	1 {
		3 = CONTENT
		3 {
			table = tt_content
			select {
				orderBy = sorting
				where = colPos = 0
				languageField = sys_language_uid
			}
			wrap = <div class="slide-wrap">|</div>
		}

		5 = CONTENT
		5 {
			table = tt_content
			select {
				orderBy = sorting
				where = colPos = 1
				languageField = sys_language_uid
			}
			wrap = <div class="img-wrap">|</div>
		}

		7 = CONTENT
		7 {
			table = tt_content
			select {
				orderBy = sorting
				where = colPos = 2
				languageField = sys_language_uid
			}
			wrap = <div class="closer-wrap">|</div>
		}
		stdWrap.wrap = <section id="main-content">|</section>
	}
	2 = COA
	2 {
		## Backend Layout ID: 2
		3 = CONTENT
		3 {
			table = tt_content
			select {
				orderBy = sorting
				where = colPos = 0
				languageField = sys_language_uid
			}
			wrap = |
		}
		stdWrap.wrap = <section id="main-content" class="main-wrapper header-center">|</section>
	}
	3 = COA
	3 {
		## Backend Layout ID: 3
		3 = CONTENT
		3 {
			table = tt_content
			select {
				orderBy = sorting
				where = colPos = 0
				languageField = sys_language_uid
			}
			wrap = <div class="bgIMG-wrapper">|</div>
		}

		5 = CONTENT
		5 {
			table = tt_content
			select {
				orderBy = sorting
				where = colPos = 1
				languageField = sys_language_uid
			}
			wrap = <div class="main-wrapper">|</div>
		}

		stdWrap.wrap = <section id="main-content">|</section>
	}
}

###################
#       PAGE      #
###################
page = PAGE
page {
	typeNum = 0
	insertClassesFromRTE = 1
	adminPanelStyles = 1

	10.marks.LANGLEGAL = HMENU
	10.marks.LANGLEGAL {
		special = list
		special.value = 9

		1 = TMENU
		1 {
			NO.wrapItemAndSub = <span>|</span>
			expAll = 1
		}
		stdWrap.wrap = <div class="legal">|</div>
	}

	10.marks.NAVIGATION = COA
	10.marks.NAVIGATION {
		3 = TEXT
		3 {
			value (
				<img src="fileadmin/template/XXX/images/XXX.jpg" width="135" height="auto" title="XXX"/>
			)
			stdWrap.typolink = 1
			stdWrap.typolink.parameter = 1 _self logo
			stdWrap.outerWrap = <div class="logo">|</div>
		}

		5 = HMENU
		5 {
			1 = TMENU
			1 {
				wrap = <ul>|</ul>
				NO.wrapItemAndSub = <li>|</li>
				expAll = 1

				ACT = 1
				ACT.wrapItemAndSub = <li class="nav_active">|</li>
			}
		}
	}

	10.marks.MAINCONTENT < temp.BLswitcher

	10.marks.NEWS = CONTENT
	10.marks.NEWS {
		table = tt_content
		select {
			orderBy = sorting
			where = colPos = 0
			pidInList = 7
			languageField = sys_language_uid
		}
		wrap = <div class="news-wrap">|</div>
	}

	# LAYOUTS #
	10 = TEMPLATE
	10 {
		template = FILE
		workOnSubpart = DOKUMENT
		template.file= fileadmin/template/XXX/layout_typo3.html
	}

	# INCLUDE CSS #
	includeCSS {
		reset = fileadmin/template/XXX/css/reset.css
		layout = fileadmin/template/XXX/css/layout.css
		rte = fileadmin/template/XXX/css/rte.css
	}

	includeJS {
		mainscript = fileadmin/template/XXX/js/main.js
	}

	# TITLE #
	headerData.10 = TEXT
	headerData.10 {
		field = title
		noTrimWrap = |<title>| - XXX</title>|
	}

	headerData.20 = TEXT
	headerData.20.value (
		<script src="//use.typekit.net/vnw4ehe.js"></script>
		<script>try{Typekit.load();}catch(e){}</script>
	)

	# GOOGLE ANALYTICS #
#  	headerData.999 = TEXT
#  	headerData.999.value (
#  		<script>
# 		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
# 		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
# 		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
# 		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
#
# 		  ga('create', 'XXX', 'XXX');
# 		  ga('set', 'anonymizeIp', true);
# 		  ga('send', 'pageview');
#
# 		</script>
#  	)


	# META #
	meta {
		description.field = description
		description.ifEmpty = XXX

		#date.data = page:SYS_LASTCHANGED // page:crdate;
		#date.date = Y-m-d

		# The most important Tag for responsive Design is the viewport (Steve Jobs)
		viewport = user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1
        robots = index,follow
        #apple
        apple-mobile-web-app-capable = no
        #apple-mobile-web-app-status-bar-style = black-translucent
        author = C3 marketing agentur GmbH, Bahnhofstrasse 3, 95643 Tirschenreuth
        copyright = XXX
        title.data = field:title
	}
}