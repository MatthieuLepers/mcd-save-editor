import { mount, createLocalVue } from '@vue/test-utils';
import GenerateModifiers from '@/plugins/GenerateModifiers';
import NotificationItem from '@/components/Notification/Item';
import NotificationStore from '@/components/Notification/NotificationStore';

beforeEach(() => {
  jest.useFakeTimers();
});

const localVue = createLocalVue();
localVue.use(GenerateModifiers);

describe('NotificationItem.vue', () => {
  const notification = NotificationStore.success('Success');
  const wrapper = mount(NotificationItem, {
    localVue,
    propsData: { notification },
  });

  it('renders notification', () => {
    expect(wrapper.text()).toBe('Success');
    expect(wrapper.vm.disapear).toBeFalsy();
  });

  // it('starts disapear after 3s', async () => {
  //   jest.advanceTimersByTime(3000);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.vm.disapear).toBeTruthy();
  // });
});
