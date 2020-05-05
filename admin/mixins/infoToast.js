export default {
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    makeToast(title, status) {
      let statusUpdate = ((status) => {
        if (status == 'update') {
          return 'updated'
        } else if (status == 'delete') {
          return 'deleted'
        } else if (status == 'add') {
          return 'added'
        }
      })
      // Use a shorter name for this.$createElement
      const h = this.$createElement
      // Create the message
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-2'] },
        [
          h('b-spinner', { props: { type: 'grow', small: true } }),
          'The product ',
          h('strong', `${title}`),
           ` is ${statusUpdate(status)} successfully... `,
          h('b-spinner', { props: { type: 'grow', small: true } })
        ],
      )
      this.$root.$bvToast.toast(vNodesMsg, {
        title: 'Product update Status',
        autoHideDelay: 5000,
        appendToast: false,
        variant: 'info'
      })
    }
  }
}
