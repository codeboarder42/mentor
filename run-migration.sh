#!/bin/bash

npm run build
npm run typeorm -- migration:run -d dist/src/ormconfig.js