#
# FILE NAME: remember_me.feature
# DESCRIPTION: remember_me FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 12-Mar-18
# NOTES:
#

  Ovde

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
  Scenario Outline: Log in with TFA and Remember me
    When I enter the "<email>" and "<password>" into GShare
    And I check the Remember me checkbox
    And I click on the login button
    Then I should see a screen requesting my 2FA code
    When I open the G Wallet app on my phone
    And I enter the 6 digit 2FA code received from the app into GShare
    Then I should see the main page of GShare

  Examples:
  | email                     | password |
  | twofa.qa.test@outlook.com | 2fatest1 |

  @manual
  Scenario Outline: Verify Remember me logs you in automatically after application update
    When I login using "<email>" and "<password>" and i check the Remember me checkbox
    And I open the settings tab
    And I click the check for updates button
    And I accept downloading and updating the application
    Then I see that after the application has updated I am automatically logged into the app

  Examples:
   | email                               | password    |
   | incomplete.registration@outlook.com | register123 |