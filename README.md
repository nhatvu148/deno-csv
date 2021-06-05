## Enable permissions:

- deno run --allow-env deno.ts
- deno run --allow-all deno.ts
- deno run -A deno.ts

## Install deno binaries with specific permissions:

- deno install --allow-env deno.ts

## Run Drakefile:

- deno run -A Drakefile.ts hello

## Save cached dependencies:

- export DENO_DIR=deno_dir
- deno cache main.ts

## Packages, 3rd party modules:

- https://deno.land/x

## Reload cache for troubleshooting:

- deno run --reload --allow-net --allow-write main.ts
