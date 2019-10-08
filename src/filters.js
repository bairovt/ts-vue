import Vue from 'vue';
import store from './store';

Vue.filter('keyFromId', keyFromId);
Vue.filter('paid', paid);
Vue.filter('sum', sum);
Vue.filter('localeDate', localeDate);
Vue.filter('status', status);
Vue.filter('ruDate', ruDate);
Vue.filter('providerName', providerName);
Vue.filter('meatName', meatName);

function keyFromId(id) {
  return id.split('/')[1]
}

function meatName(value) {
  if (!value) return null;
  const meat = store.state.meats.find(el => {
    return el.value === value;
  });
  return meat.text;
}

function providerName(providerId) {
  if (!providerId) return null;
  const provider = store.state.allProviders.find(el => {
    return el._id === providerId;
  });
  return provider ? provider.name : null;
}

function ruDate(ISOdate) {
  if (!ISOdate) return null;
  const date = ISOdate.split('T')[0]; // year-month-day part
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year - 2000}`;
}

function status(value) {
  if (!value) return '';
  const status = store.state.statuses.find((item) => {
    return item.value === value;
  });
  return status.text;
}

function localeDate(ISOdate) {
  let date = new Date(ISOdate);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  date = date.toLocaleDateString('ru', options);
  return date === 'Invalid Date' ? '-' : date;
}

function sum(order) {
  return order.qty * order.price;
}

function paid(order) {
  let totalPaid = 0;
  if (order.payments) {
    totalPaid = order.payments.reduce((total, payment) => {
      return total + payment.sum;
    }, 0);
  }
  return totalPaid;
}