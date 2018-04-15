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
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in

  @manual
  Scenario Outline: Incorrect password is not accepted
    When I enter incorrect password <password>
    Then Login should fail with message <message>

    Examples:
      | passowrd     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |
      | abcdefgh     | Cannot login using the supplied credentials |
