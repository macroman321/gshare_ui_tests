# Convenience script for running CMAPP tests.
#
# Parameters:
# $1 platform
# $2 variant
# $3 environment
# $4 and after are standard Cucumberjs parameters
#
# Usage examples:
# $ ./run.sh windows gamecredits stage
# $ ./run.sh linux esprit prod
./node_modules/.bin/cucumber-js \
    --world-parameters "{\"platform\": \"${platform}\", \"variant\": \"${variant}\", \"environment\": \"$3\"}" \
    ${@:4}
