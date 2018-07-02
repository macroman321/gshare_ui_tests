#
# FILE NAME: log_in.feature
# DESCRIPTION: log_in FEATURE
# AUTHOR: Dragan Nikolić (DN)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Log in

  Background:

  @all_env
  Scenario: Log in
    When I log in as user "qa_user_1"


  @manual
    Scenario: Enable 2FA for GShare login
      When I open the google play store on my android phone (or app store on my iOS phone)
      And I enter "G Wallet" into the search bar
      Then I should see the G Wallet application
      When I click the download button
      And I enter twofa.qa.test@outlook.com as my email in the application
      And I enter 2fatest1 as the password
      And I click on log on
      And I click on the Two factor authentication option
      And I click on Activate for 2FA
      Then I should be required to use 2FA in future logins


  @manual
  Scenario Outline: Log in with 2FA
    Given 2FA is activated
    When I enter the "<email>" and "<password>" into GShare
    And I click on the login button
    Then I should see a screen requesting my 2FA code
    When I open the G Wallet app on my phone
    And I enter the 6 digit 2FA code received from the app into GShare
    Then I should see the main page of GShare

    Examples:
    | email                     | password |
    | twofa.qa.test@outlook.com | 2fatest1 |

  @manual
  Scenario Outline: Try to log in with an incorrect 2FA code
    Given 2FA is activated
    When I enter the "<email>" and "<password>" into GShare
    And I click on the login button
    Then I should see a screen requesting my 2FA code
    When I enter a random 6 digit code into GShare
    Then I should see the message "Wrong 2FA code"

  Examples:
  | email                     | password |
  | twofa.qa.test@outlook.com | 2fatest1 |

  @all_env
  Scenario Outline: Try to log in with an incorrect password
    When I start GShare
    And I enter email of the user "qa_user_1" and password "<password>"
    Then I should see login has failed with "<message>"

    Examples:
      | password     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |
