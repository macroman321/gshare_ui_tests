#
# FILE NAME: app_preferences.feature
# DESCRIPTION: app_preferences FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: App preferences

  @manual
  Scenario:Verify that collecting rewards does not start if prevent laptop battery drain is on and laptop power is disconnected
    When I log into GShare
    And I click on the settings menu
    And I turn on the "Prevent laptop battery drain" option
    And I remove the power cable from the laptop
    Then I see the message "Battery saver mode enabled. Certain features are disabled until you plug in to a power source."
    And I am unable to start the miner

  @manual
  Scenario:Verify that collecting rewards starts if prevent laptop battery drain is off and laptop power is disconnected
    When I log into GShare
    And I click on the settings menu
    And I turn off the "Prevent laptop battery drain" option
    And I remove the power cable from the laptop
    Then I am able to start the miner

  @manual
  Scenario:Verify that collecting rewards stop when laptop power is disconnected and prevent laptop battery drain is on
    When I log into GShare
    And I click on the settings menu
    And I turn on the "Prevent laptop battery drain" option
    And I turn on the miner
    And I remove the power cable from the laptop
    Then I see the message "Battery saver mode enabled. Certain features are disabled until you plug in to a power source."
    And I see the miner is disabled and cannot be started

  @manual
  Scenario:Verify that collecting rewards doesn't stop when laptop power is disconnected and prevent laptop battery drain is off
    When I log into GShare
    And I click on the settings menu
    And I turn off the "Prevent laptop battery drain" option
    And I turn on the miner
    And I remove the power cable from the laptop
    Then I see the miner is still working

  @manual
  Scenario:Verify that turning on prevent laptop battery drain during collecting rewards does not stop rewards collecting
    When I log into GShare
    And I turn on the miner
    And I click on the settings menu
    And I turn on the "Prevent laptop battery drain" option
    Then I see the miner is still working

  @manual
  Scenario: Verify that if Auto Launch is selected in options, the application starts on system startup
    When I log into GShare
    And I click on the settings menu
    And I turn on the "Auto launch at system startup" option
    And I restart my computer
    Then I see GShare open at startup
