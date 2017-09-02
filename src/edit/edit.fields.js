/**
 * Define each editable field
 */
export default [
  [{
    title: 'Headline',
    name: 'headline',
    model: '',
  }],
  [{
    title: 'Check Size Minimum',
    name: 'target_check_size_min',
    partnerField: 'target_check_size_max',
    model: '',
    financial: true,
  }, {
    title: 'Check Size Maximum',
    name: 'target_check_size_max',
    partnerField: 'target_check_size_min',
    model: '',
    financial: true,
  }],
  [{
    title: 'Revenue Minimum',
    name: 'target_revenue_min',
    partnerField: 'target_revenue_max',
    model: '',
    financial: true,
  }, {
    title: 'Revenue Maximum',
    name: 'target_revenue_max',
    partnerField: 'target_revenue_min',
    model: '',
    financial: true,
  }],
  [{
    title: 'EBITDA Minimum',
    name: 'target_ebitda_min',
    partnerField: 'target_ebitda_max',
    model: '',
    financial: true,
  }, {
    title: 'EBITDA Maximum',
    name: 'target_ebitda_max',
    partnerField: 'target_ebitda_min',
    model: '',
    financial: true,
  }],
];