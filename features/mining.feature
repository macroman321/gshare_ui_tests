#
# FILE NAME: start_mining.feature
# DESCRIPTION:  start_mining FEATURE
# AUTHOR: Dimitrije Dragašević (DD)
# CREATED: 20-Apr-18
# NOTES:
#

Feature: Mining
  @all_env
  Scenario: Mining using an existing user
    Given I log in as user "qa_user_5"
    When I click on the Start button
    Then I should see the application has started to successfully work
    When I click on the Pause button
    Then I should see that the application has stopped mining

  @manual
  Scenario: Mining using a new user and fresh app installation

  @manual
  Scenario: Mining using an existing user after reinstalling the app
    Given I uninstall the app
    And I remove folder holding app data /Users/<user>/AppData/Roaming/GShare
    And I reinstall the app
    When I log in as user "qa_user_5"
    And I start mining
    Then I should see app is mining successfully

  @manual
  Scenario: Mining settings menu
