run-purescript:
	@cd purescript; \
	../node_modules/.bin/pulp run; \
	cd -

format:
	@./node_modules/.bin/prettier \
		--write \
		--single-quote \
		--print-width 64 \
		js/*.js ts/Array.find.ts
