import { mount } from "@vue/test-utils";
import ContactEditor from "@/components/ContactEditor.vue";

describe("ContactEditor", () => {
  let wrapper;
  let mockContact;

  beforeEach(() => {
    mockContact = {
      name: "",
      address: "",
      mobile: "",
      email: "",
    };

    wrapper = mount(ContactEditor, {
      propsData: {
        contact: mockContact,
      },
    });
  });

  it("renders the contact form with inputs", () => {
    expect(wrapper.find('label[for="name"]').text()).toBe("Name");
    expect(wrapper.find('label[for="address"]').text()).toBe("Address");
    expect(wrapper.find('label[for="mobile"]').text()).toBe("Mobile");
    expect(wrapper.find('label[for="email"]').text()).toBe("Email");
  });

  it("binds the input fields to the contact object", async () => {
    const nameInput = wrapper.find('input[placeholder="Enter your name"]');
    const addressInput = wrapper.find('input[placeholder="Enter your address"]');
    const mobileInput = wrapper.find('input[placeholder="Enter your mobile number"]');
    const emailInput = wrapper.find('input[placeholder="Enter your email"]');

    await nameInput.setValue("John Doe");
    await addressInput.setValue("123 Main St");
    await mobileInput.setValue("123-456-7890");
    await emailInput.setValue("john.doe@example.com");

    expect(mockContact.name).toBe("John Doe");
    expect(mockContact.address).toBe("123 Main St");
    expect(mockContact.mobile).toBe("123-456-7890");
    expect(mockContact.email).toBe("john.doe@example.com");
  });
});
