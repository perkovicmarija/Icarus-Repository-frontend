#!/bin/sh

if [ -z "$FRONTEND_BUILD_DESTINATION" ]; then
    echo "Please provide FRONTEND_BUILD_DESTINATION env variable"
else
    DESTINATION="/app/apache/icarus/${FRONTEND_BUILD_DESTINATION}/"
    mkdir -p $DESTINATION
    echo "copy /build to apache /var/www/html/icarus/${FRONTEND_BUILD_DESTINATION}/build"
    cp -r /app/build $DESTINATION
fi

