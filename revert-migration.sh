#!/bin/bash

npm run build
npm run typeorm -- migration:revert -d dist/src/ormconfig.js