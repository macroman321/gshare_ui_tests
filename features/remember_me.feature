#
# FILE NAME: remember_me.feature
# DESCRIPTION: remember_me FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Remember me

  @all_env
  Scenario: Log in with Remember me
    When I log in as user "qa_user_2"
    Then I should see the user has been successfully logged in
    When I press the Quit button
    And I start GShare
    Then I should see the user has been successfully logged in

  @manual
  Scenario: Verify Remember me logs you in automatically after application update

  @manual
  ### Coming in a later update ###
  Scenario: Log in with 2FA and Remember me

  @manual
  ### Coming in a later update ###
  Scenario: Log in with Email 2FA and Remember me
