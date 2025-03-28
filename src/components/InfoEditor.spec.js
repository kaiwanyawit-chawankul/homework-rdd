import { mount } from '@vue/test-utils';
import InfoEditor from '@/components/InfoEditor.vue';

describe('InfoEditor.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(InfoEditor, {
      props: {
        resume: {
          title: '',
          description: ''
        }
      }
    });
  });

  it('renders the title input field correctly', () => {
    const titleInput = wrapper.find('#title');
    expect(titleInput.exists()).toBe(true);
    expect(titleInput.element.value).toBe('');
  });

  it('renders the description textarea field correctly', () => {
    const descriptionTextarea = wrapper.find('#description');
    expect(descriptionTextarea.exists()).toBe(true);
    expect(descriptionTextarea.element.value).toBe('');
  });

  it('binds the title input value to the resume object', async () => {
    const titleInput = wrapper.find('#title');
    await titleInput.setValue('Software Engineer');
    expect(wrapper.vm.resume.title).toBe('Software Engineer');
  });

  it('binds the description textarea value to the resume object', async () => {
    const descriptionTextarea = wrapper.find('#description');
    await descriptionTextarea.setValue('Experienced software engineer with a passion for building innovative solutions.');
    expect(wrapper.vm.resume.description).toBe('Experienced software engineer with a passion for building innovative solutions.');
  });
});
