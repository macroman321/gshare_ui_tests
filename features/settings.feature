#
# FILE NAME: settings.feature
# DESCRIPTION: settings FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 08-Oct-18
# NOTES:
#

Feature: Settings

  Background:
    Given I log in as user "qa_user_2" without Remember me

  @wip
  Scenario: Verify settings links send you to the intended website (Visit store, Do good)

  @all_env
  Scenario: Check for updates when application is up to date
    When I enter the settings menu
    And I click the Check for updates button
    Then I should see the message "You have the latest version of GShare!"

  @manual
  Scenario: Check for updates when there is a new version
  