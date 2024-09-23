import auth from '@/services/arbaguette/auth';
import boss from '@/services/arbaguette/boss';
import common from '@/services/arbaguette/common';
import crew from '@/services/arbaguette/crew';

export default {
  ...auth,
  ...boss,
  ...crew,
  ...common,
};
