import { mount, createLocalVue } from '@vue/test-utils';
import GenerateModifiers from '@/plugins/GenerateModifiers';
import NotificationList from '@/components/Notification/List';
import NotificationStore from '@/components/Notification/NotificationStore';

beforeEach(() => {
  jest.useFakeTimers();
});

const localVue = createLocalVue();
localVue.use(GenerateModifiers);

describe('NotificationList.vue', () => {
  const wrapper = mount(NotificationList, { localVue });

  it('renders notification', async () => {
    NotificationStore.success('Success');
    await wrapper.vm.$nextTick();
    expect(wrapper.element.children.length).toBe(1);
  });

  it('notification still present before 3.5s', async () => {
    jest.advanceTimersByTime(3499);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.children.length).toBe(1);
  });

  it('remove notification after 3.5s', async () => {
    jest.advanceTimersByTime(3500);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.children.length).toBe(0);
  });
});
