# Convenience script for running GShare tests.
#
# Parameters (for description see TestData.load function):
# $1 platform
# $2 environment
# $3 and after are standard CucumberJS parameters
#
# Usage examples:
# $ ./run.sh windows stage
# $ ./run.sh linux prod
./node_modules/.bin/cucumber-js \
    --world-parameters "{\"platform\": \"$1\", \"environment\": \"$3\"}" \
    --tags "@all_env or @$3_env" \
    ${@:4}
