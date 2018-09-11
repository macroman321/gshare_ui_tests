#
# FILE NAME: app_preferences.feature
# DESCRIPTION: app_preferences FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: App preferences

  @manual
  Scenario: Verify miner can't be started if "Prevent laptop battery drain" is on and laptop power is disconnected
    When I log in to GShare
    And I open the settings menu
    And I turn on the "Prevent laptop battery drain" option
    And I remove the power cable from the laptop
    Then I should see the message "Battery saver mode enabled. Certain features are disabled until you plug in to a power source."
    And I should see I am unable to start the miner

  @manual
  Scenario: Verify miner can be started if "Prevent laptop battery drain" is off and laptop power is disconnected
    When I log in to GShare
    And I open the settings menu
    And I turn off the "Prevent laptop battery drain" option
    And I remove the power cable from the laptop
    Then I should see I am able to start the miner

  @manual
  Scenario: Verify mining stops when laptop power is disconnected and "Prevent laptop battery drain" is on while mining
    When I log in to GShare
    And I open the settings menu
    And I turn on the "Prevent laptop battery drain" option
    And I turn on the miner
    And I remove the power cable from the laptop
    Then I see the message "Battery saver mode enabled. Certain features are disabled until you plug in to a power source."
    And I should see the miner is disabled and cannot be started

  @manual
  Scenario: Verify mining doesn't stop when laptop power is disconnected and "Prevent laptop battery drain" is off while mining
    When I log in to GShare
    And I open the settings menu
    And I turn off the "Prevent laptop battery drain" option
    And I turn on the miner
    And I remove the power cable from the laptop
    Then I should see the miner is still working

  @manual
  Scenario: Verify turning on "Prevent laptop battery drain" while mining does not stop the miner
    When I log in to GShare
    And I turn on the miner
    And I open the settings menu
    And I turn on the "Prevent laptop battery drain" option
    Then I should see the miner is still working

  @manual
  Scenario: Verify "Auto launch at system startup" option runs the application on system startup
    When I log in to GShare
    And I open the settings menu
    And I turn on the "Auto launch at system startup" option
    And I restart my computer
    Then I should see GShare open at startup

  @manual
  Scenario: Verify "Auto-download updates" option downloads updates for the application in the background and notifies you
    When I log in to GShare
    And I open the settings menu
    And I turn on the "Auto-download updates" option
    Then I should see the application download new updates and notifies me that an update is available

  @manual:
  Scenario: Verify "Beta updates" option downloads beta updates of the application and notifies you
    When I log in to GShare
    And I open the settings menu
    And I turn on the "Beta updates" option
    Then I should see the application downloads beta updates and notifies me that a beta update is available
