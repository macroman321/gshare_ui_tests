#
# FILE NAME: remember_me.feature
# DESCRIPTION: remember_me FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Remember me

  Background:
    Given I start GShare

  @all_env
  Scenario: Log in with Remember me
    When I enter credentials for the user "qa_user_5"
    And I ensure the Remember me is checked
    And I click the Login button
    Then I should see the user is logged in
    When I press the Quit button
    And I start GameClient
    Then I should see the user is logged in
    And I log out of the application

  @manual
  ### coming in a later update ###
  Scenario: Log in with 2FA and Remember me

  @manual
  ### coming in a later update ###
  Scenario: Log in with Email 2FA and Remember me

  @manual
  ### coming in a later update ###
  Scenario: Verify Remember me logs you in automatically after application update
