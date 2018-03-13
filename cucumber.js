#
# cucumber.js
#
# The cucumber.yml defines profiles and project variables.
#

# The blocks below are applied to all profiles
# The '-r' enables usage of sub directories for feature file dependencies
<% require_default = "-r steps -r support -r features" %>
<% formater_default = "--format 'html' --out=features_report.html --format 'junit' --out=junit.xml --color" %>
<% tags_default = "--tags 'not @wip' --tags 'not @manual'" %>

# *** SYSTEMS TO TEST ***
# If you don't specify "-p <profile name>" in command line, a default profile is
# used
default: >
  --profile stage

# -p stage: Profile for STAGING environment
stage: >
  <%= require_default %> <%= formater_default %> <%= tags_default %> --tags '@all_env or @stage_env' SYSTEM_UNDER_TEST=sut_stage.yml TEST_DATA=td_stage.yml

# -p prod: Profile for PRODUCTION environment
prod: >
  <%= require_default %> <%= formater_default %> <%= tags_default %> --tags '@all_env or @prod_env' SYSTEM_UNDER_TEST=sut_prod.yml TEST_DATA=td_prod.yml

# -p chrome: Profile for running the test using Chrome browser (if not specified
# Firefox is default)
chrome: >
  BROWSER_TYPE=chrome
