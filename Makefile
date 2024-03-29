.PHONY: dev serve watch scrall scrh scri scrhm scrim scremp dbgen dbpush dbdrop dbinsert dbdelete s3upload

dev:
	@npm run dev

serve:
	@npm run serve

watch:
	@npm run watch

scrall: scrh scri scrhm scrim

scrh:
	@cd src/scraper/lotus && scrapy crawl hero -O ../../../data/heroes.json

scri:
	@cd src/scraper/lotus && scrapy crawl item -O ../../../data/items.json

scrhm:
	@cd src/scraper/lotus && scrapy crawl hero-meta -O ../../../data/heroes.meta.json

scrim:
	@cd src/scraper/lotus && scrapy crawl item-meta -O ../../../data/items.meta.json

scremp:
	@rm data/heroes.json data/items.json data/heroes.meta.json data/items.meta.json

dbgen:
	@npm run dbgen

dbpush:
	@npm run dbpush

dbdrop:
	@npm run dbdrop

dbinsert:
	@npm run dbinsert

dbdelete:
	@npm run dbdelete

s3upload:
	@npm run s3upload