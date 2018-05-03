#
# FILE NAME: login.feature
# DESCRIPTION: Verify CMAPP login
# AUTHOR: Dragan Nikolic (DN)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: GameClient Login

  Background:
    Given I start GameClient

  Scenario: Successful Login
    When I enter credentials for the user "qa_user_1"
    Then I should see the user is logged in

  Scenario Outline: Incorrect password is not accepted
    When I enter email of the user "qa_user_1" and password "<password>"
    Then I should see login has failed with "<message>"

    Examples:
      | password     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |

  @manual
  Scenario: Test valid Login with 2FA code
    When I enter a valid credentials
    And I enter a valid 2FA code
    Then I should be loged in succesfully in application

  @manual
  Scenario: Test invalid verification code
    When I enter a valid credentials
    And I enter a wrong 2FA code
    Then I should see notification that 2FA code is wrong
