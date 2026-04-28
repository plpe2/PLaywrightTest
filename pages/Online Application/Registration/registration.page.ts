import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;

  // --- Section: Registration Type ---
  readonly OwnerRegistration: Locator;
  readonly urlLink: string;

  readonly ownerInfo: {
    firstName: string;
    lastName: string;
  };

  readonly contactInfo: {
    email: string;
    mobileNumber: string;
    address: string;
    zipCode: string;
  };

  readonly usernameValue: string;
  readonly passwordValue: string;

  // --- Section: Owner Info ---
  readonly formOfOwnership: Locator;
  readonly isOwnerApplicant: Locator;
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly gender: Locator;
  readonly civilStatus: Locator;

  // --- Contact ---
  readonly email: Locator;
  readonly mobileinput: Locator;
  readonly address: Locator;
  readonly zipCode: Locator;

  // --- Account ---
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly securityQuestion: Locator;
  readonly answer: Locator;
  readonly securityCode: Locator;

  // --- Actions ---
  readonly submitButton: Locator;
  readonly confirmModal: Locator;
  readonly confirmButton: Locator;

  constructor({
    page,
    urlLink,
    OwnerInfo,
    ContactInfo,
    usernameValue,
    passwordValue,
  }: {
    page: Page;
    urlLink: string;
    OwnerInfo: {
      firstName: string;
      lastName: string;
    };
    ContactInfo: {
      email: string;
      mobileNumber: string;
      address: string;
      zipCode: string;
    };
    usernameValue: string;
    passwordValue: string;
  }) {
    this.page = page;
    this.urlLink = urlLink;
    this.ownerInfo = OwnerInfo;
    this.contactInfo = ContactInfo;
    this.usernameValue = usernameValue;
    this.passwordValue = passwordValue;

    // Registration Type
    this.OwnerRegistration = page.getByLabel("Owner Registration");

    // Owner Info
    this.formOfOwnership = page.getByLabel("Form of Ownership");
    this.isOwnerApplicant = page.getByLabel("Check if Owner is the Applicant");
    this.title = page.locator("#Owner_Title");

    this.firstName = page.locator('input[name="Owner.FirstName"]');
    this.lastName = page.locator('input[name="Owner.LastName"]');

    this.gender = page.locator("#Owner_Gender");
    this.civilStatus = page.locator("#Owner_CivilStatus");

    // Contact
    this.email = page.locator(
      "//*[@id='formRegister']/div[2]/div/div[1]/div[2]/div[3]/div[2]/div[1]/div[8]/div[3]/a/input",
    );
    this.mobileinput = page.locator(
      "//*[@id='formRegister']/div[2]/div/div[1]/div[2]/div[3]/div[2]/div[1]/div[8]/div[1]/a/input",
    );
    this.address = page.locator(
      "//*[@id='formRegister']/div[2]/div/div[1]/div[2]/div[3]/div[2]/div[1]/div[9]/div[1]/a/input",
    );
    this.zipCode = page.locator(
      "//*[@id='formRegister']/div[2]/div/div[1]/div[2]/div[3]/div[2]/div[1]/div[9]/div[2]/a/input",
    );

    // Account
    this.username = page.locator(
      "//*[@id='formRegister']/div[2]/div/div[1]/div[2]/div[5]/div[2]/div[1]/a/input",
    );
    this.password = page.locator("//*[@id='Password']");
    this.confirmPassword = page.locator("//*[@id='txtConfirmPassword']");
    this.securityQuestion = page.locator(
      "//*[@id='AccountInfo_SecurityQuestionID']",
    );
    this.answer = page.locator("#txtAnswer");
    this.securityCode = page.locator("#txtsecuritycode");

    // Actions
    this.submitButton = page.getByRole("button", {
      name: /submit to registration/i,
    });

    this.confirmModal = page.locator("#ModalConfirmMessage");
    this.confirmButton = page.locator(
      "#ModalConfirmMessage button:nth-child(2)",
    );
  }

  async goto() {
    await this.page.goto(this.urlLink);
  }

  async selectOwnerRegistration() {
    await this.OwnerRegistration.click();
  }

  async fillOwnerInfo() {
    await this.formOfOwnership.selectOption("Individual");
    await this.isOwnerApplicant.check();
    await this.title.selectOption("Mr.");
    await this.firstName.fill(this.ownerInfo.firstName);
    await this.lastName.fill(this.ownerInfo.lastName);
    await this.gender.selectOption("Male");
    await this.civilStatus.selectOption("Single");
  }

  async fillContact() {
    await this.email.fill(this.contactInfo.email);
    await this.mobileinput.fill(this.contactInfo.mobileNumber);
    await this.address.fill(this.contactInfo.address);
    await this.zipCode.fill(this.contactInfo.zipCode);
  }

  async fillAccount() {
    await this.username.fill(this.usernameValue);
    await this.password.fill(this.passwordValue);
    await this.confirmPassword.fill(this.passwordValue);

    await this.securityQuestion.selectOption({
      label: "What is your Mothers' mother maiden name?",
    });

    await this.answer.fill("Google");
    await this.securityCode.fill("1234");
  }

  async submit() {
    await this.submitButton.click();
  }

  async confirmIfVisible() {
    await expect(this.confirmModal).toBeVisible();

    if (await this.confirmButton.isVisible()) {
      await this.confirmButton.click();
    }
  }

  async expectSuccess() {
    await expect(this.page.getByText(/registration/i)).toBeVisible();
  }
}
