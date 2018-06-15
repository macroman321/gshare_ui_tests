#
# FILE NAME: app_preferences.feature
# DESCRIPTION: app_preferences FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: App preferences

  @manual
  Scenario:Try to start mining without power cable and prevent laptop battery drain is on
    When I log into GShare
    And I click on the settings menu
    And I turn on the "Prevent laptop battery drain" option
    And I remove the power cable from the laptop
    Then I see the message "Battery saver mode enabled. Certain features are disabled until you plug in to a power source."
    And I am unable to start the miner

  @manual
  Scenario:Try to start mining without power cable and prevent laptop battery drain is off
    When I log into GShare
    And I click on the settings menu
    And I turn off the "Prevent laptop battery drain" option
    And I remove the power cable from the laptop
    Then I am able to start the miner

  @manual
  Scenario:Disconnect power cable while mining and prevent laptop battery drain is on
    When I log into GShare
    And I click on the settings menu
    And I turn on the "Prevent laptop battery drain" option
    And I turn on the miner
    And I remove the power cable from the laptop
    Then I see the message "Battery saver mode enabled. Certain features are disabled until you plug in to a power source."
    And I see the miner is disabled and cannot be started

  @manual
  Scenario:Disconnect power cable while mining and prevent laptop battery drain is off
    When I log into GShare
    And I click on the settings menu
    And I turn off the "Prevent laptop battery drain" option
    And I turn on the miner
    And I remove the power cable from the laptop
    Then I see the miner is still working

  @manual
  Scenario:Turn on prevent laptop battery drain while mining
    When I log into GShare
    And I turn on the miner
    And I click on the settings menu
    And I turn on the "Prevent laptop battery drain" option
    Then I see the miner is still working

  @manual
  Scenario: Auto launch at Startup
    When I log into GShare
    And I click on the settings menu
    And I turn on the "Auto launch at system startup" option
    And I restart my computer
    Then I see GShare open at startup
