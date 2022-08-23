@opera
Feature: Check keeping accounts after extension update in Opera browser

  Background: Initialize and verify test data
    Given I on the 'CHROMIUM_EXTENSIONS' page
    When I click on the Enable Developer mode button in Opera
    And I click on the Extension details button in Opera
    And I grab and set Opera extension id to local storage with tag 'operaId'
    When I click on the Enable Developer mode button in Opera
    And I prepare Opera extension
    And I click on the Get Started button
    And I fill password fields
    And I accept terms
    And I click on the Continue button
    And I populate Embedded Seeds
    And I populate Embedded Emails
    And I on the 'CHROMIUM_EXTENSIONS' page
    And I click on the Enable Developer mode button in Opera
    And I click on the Extension details button in Opera
    And I grab and set Opera extension id to local storage with tag 'operaId'
    And I on the 'POPUP' page for id 'operaId'
    And I click on the Settings button
    And I click on the General Settings button
    And I set Keeper timeout for '1 hour'
    And I click on Back Settings button
    And I click on Close Settings button
    And I choose 'Mainnet' network
    Then The account 'MAINNET_EMAIL' is 'available' on the asset tab
    And I see WAVES asset is 'available' on the asset page
    When I click on the 'NFTs' tab
    Then I see 'You don't have any NFT yet' message
    When I click on the 'History' tab
    Then I see 'There's nothing to show yet' message
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'MAINNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    And I see WAVES asset is 'available' on the asset page
    And The assets of embedded Mainnet seed is 'available' on the Assets tab
    When I choose 'Testnet' network
    Then The account 'TESTNET_EMAIL' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then The assets of embedded Testnet email is 'available' on the Assets tab
    When I click on the 'NFTs' tab
    Then The NFTs for Embedded Testnet Email is 'available' on the NFT tab
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'TESTNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    And I see WAVES asset is 'available' on the asset page
    And The assets of embedded Testnet seed is 'available' on the Assets tab
    When I choose 'Stagenet' network
    Then The account 'STAGENET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then The assets of embedded Stagenet seed is 'available' on the Assets tab
    When I click on the 'NFTs' tab
    Then The NFTs group is 'available' on the NFT tab

  Scenario: Update un-logged Keeper
    When I click on the Settings button
    And I click on the LogOut button
    And I on the 'CHROMIUM_EXTENSIONS' page
    When I click on the Extension details button in Opera
    Then I see Keeper version in Opera is 'not equal' to latest
    When I initialize 'opera_dir_update' folder and update extension on the latest version
    And I click on the Update Chromium extension button
    And I restart Opera extension
    Then I see Keeper version in Opera is 'equal' to latest
    When I on the 'POPUP' page for id 'operaId'
    And I fill default password
    And I submit default password
    Then The latest Keeper version 'available' in the modal page
    And The account 'STAGENET_SEED' is 'available' on the asset tab
    And The NFTs group is 'available' on the NFT tab
    When I click on the 'Assets' tab
    Then I see WAVES asset is 'available' on the asset page
    And The assets of embedded Stagenet seed is 'available' on the Assets tab
    When I choose 'Mainnet' network
    Then The account 'MAINNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    And I see WAVES asset is 'available' on the asset page
    And The assets of embedded Mainnet seed is 'available' on the Assets tab
    And I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'MAINNET_EMAIL' is 'available' on the asset tab
    And I see WAVES asset is 'available' on the asset page
    When I click on the 'NFTs' tab
    Then I see 'You don't have any NFT yet' message
    When I click on the 'History' tab
    Then I see 'There's nothing to show yet' message
    When I choose 'Testnet' network
    Then The account 'TESTNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then I see WAVES asset is 'available' on the asset page
    And The assets of embedded Testnet seed is 'available' on the Assets tab
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'TESTNET_EMAIL' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then The assets of embedded Testnet email is 'available' on the Assets tab
    When I click on the 'NFTs' tab
    Then The NFTs for Embedded Testnet Email is 'available' on the NFT tab
    When I on the 'CHROMIUM_EXTENSIONS' page
    And I click on the Extension details button in Opera
    Then I see Keeper version in Opera is 'equal' to latest
    Given I initialize 'opera_dir_init' folder and update extension on the previous version

  Scenario: Update keeper during the account seeding
    Given I on the 'CHROMIUM_EXTENSIONS' page
    When I click on the Extension details button in Opera
    And I grab and set Opera extension id to local storage with tag 'operaId'
    And I on the 'ACCOUNTS' page for id 'operaId'
    When I click on the Choose network button
    And I choose 'Testnet' network
    And I populate seed type 'TESTNET_SEED_1' with prefix 'CUSTOM_SEED'
    Then The Finish button is 'available' on the Import page
    And I see 'Your accounts are ready to use' message
    And I see 'You can now close this tab and continue using the extension or add more accounts.' message
    When I on the 'CHROMIUM_EXTENSIONS' page
    And I click on the Extension details button in Opera
    Then I see Keeper version in Opera is 'not equal' to latest
    And I initialize 'opera_dir_update' folder and update extension on the latest version
    And I click on the Update Chromium extension button
    And I restart Opera extension
    Then I see Keeper version in Opera is 'equal' to latest
    When I on the 'POPUP' page for id 'operaId'
    And I fill default password
    And I submit default password
    Then The latest Keeper version 'available' in the modal page
    And The account 'CUSTOM_SEED' is 'available' on the asset tab
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'TESTNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then I see WAVES asset is 'available' on the asset page
    And The assets of embedded Testnet seed is 'available' on the Assets tab
    When I click on the Choose Account button
    And I choose account at position '2'
    Then The account 'TESTNET_EMAIL' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then The assets of embedded Testnet email is 'available' on the Assets tab
    When I choose 'Stagenet' network
    Then The account 'STAGENET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then The assets of embedded Stagenet seed is 'available' on the Assets tab
    When I choose 'Mainnet' network
    Then The account 'MAINNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then I see WAVES asset is 'available' on the asset page
    And The assets of embedded Mainnet seed is 'available' on the Assets tab
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'MAINNET_EMAIL' is 'available' on the asset tab
    And I see WAVES asset is 'available' on the asset page
    When I click on the 'NFTs' tab
    Then I see 'You don't have any NFT yet' message
    When I click on the 'History' tab
    Then I see 'There's nothing to show yet' message
    When I on the 'CHROMIUM_EXTENSIONS' page
    And I click on the Extension details button in Opera
    Then I see Keeper version in Opera is 'equal' to latest
    Given I initialize 'opera_dir_init' folder and update extension on the previous version

  Scenario: Update Keeper with active transaction
    When I click on the 'Assets' tab
    And I click on the More button
    And I click on the Send asset button
    And I fill amount '10' for Embedded Stagenet seed
    And I click on the Transfer amount button
    Then The amount is equal to '10' and 'available' on the transfer modal page
    When I on the 'CHROMIUM_EXTENSIONS' page
    And I click on the Extension details button in Opera
    Then I see Keeper version in Opera is 'not equal' to latest
    And I initialize 'opera_dir_update' folder and update extension on the latest version
    And I click on the Update Chromium extension button
    And I restart Opera extension
    Then I see Keeper version in Opera is 'equal' to latest
    When I on the 'POPUP' page for id 'operaId'
    And I fill default password
    And I submit default password
    Then The amount is equal to '10' and 'available' on the transfer modal page
    When I click on the Reject transaction button
    Then I see 'Your transaction is rejected!' message
    When I close Transaction modal window
    Then The WAVES amount is equal to '16' and 'available' on the asset page
    And The latest Keeper version 'available' in the modal page
    And The account 'STAGENET_SEED' is 'available' on the asset tab
    And The assets of embedded Stagenet seed is 'available' on the Assets tab
    When I click on the 'NFTs' tab
    Then The NFTs group is 'available' on the NFT tab
    When I choose 'Mainnet' network
    Then The account 'MAINNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    And I see WAVES asset is 'available' on the asset page
    And The assets of embedded Mainnet seed is 'available' on the Assets tab
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'MAINNET_EMAIL' is 'available' on the asset tab
    And I see WAVES asset is 'available' on the asset page
    When I click on the 'NFTs' tab
    Then I see 'You don't have any NFT yet' message
    When I click on the 'History' tab
    Then I see 'There's nothing to show yet' message
    When I choose 'Testnet' network
    Then The account 'TESTNET_SEED' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then I see WAVES asset is 'available' on the asset page
    And The assets of embedded Testnet seed is 'available' on the Assets tab
    When I click on the Choose Account button
    And I choose account at position '1'
    Then The account 'TESTNET_EMAIL' is 'available' on the asset tab
    When I click on the 'Assets' tab
    Then The assets of embedded Testnet email is 'available' on the Assets tab
    When I on the 'CHROMIUM_EXTENSIONS' page
    And I click on the Extension details button in Opera
    Then I see Keeper version in Opera is 'equal' to latest
    Given I initialize 'opera_dir_init' folder and update extension on the previous version
