class AxisRange {
  constructor (start, end) {
    let invert = start > end
    this.start = invert ? end : start
    this.end = invert ? start : end
  }
  get len () {
    return this.end - this.start
  }
  get mid () {
    return this.start + this.len * 0.5
  }
  getRelativePoint (alpha) {
    return this.start + this.len * alpha
  }
  static fromLen (start, len) {
    return new AxisRange(start, start + len)
  }
}

class LolipopAxis {
  constructor (facets, traces, groups, facetTitleSpace = 0.03, headerSpace = 0.03, groupMargin = 2) {
    if (facets.length > 20) throw new Error('Facets count limit exceeded')
    this.facets = facets
    this.traces = traces
    this.groups = groups
    if (!groups.every(Array.isArray)) this.groups = Array(facets.length).fill(null).map(x => [...groups])
    this.facetTitleSpace = facetTitleSpace
    this.headerSpace = headerSpace
    this.groupMargin = groupMargin
    this.calcAxisLength()
    this.calcFacetsOffset()
  }
  // Length of group is count of points in a group plus upper and bottom margin
  get groupLength () {
    return this.traces.length + 2 * this.groupMargin
  }
  // How many space is filled by poins and margins (the rest is for facets' labels)
  get pointsSpacePropotion () {
    return 1 - this.facets.length * this.facetTitleSpace - this.headerSpace
  }
  calcAxisLength () {
    this.facetsSpaceLength = this.facets.map((f, i) => this.groups[i].length * this.groupLength)
    this.axisLength = (1 / this.pointsSpacePropotion) * this.facetsSpaceLength.reduce((acu, x) => acu + x, 0)
  }
  getFacetOffset (facet) {
    return this.facetsOffset[this.facets.indexOf(facet)]
  }
  calcFacetsOffset () {
    let facetTitleAbsoluteSpace = this.facetTitleSpace * this.axisLength
    let headerAbsoluteSpace = this.headerSpace * this.axisLength
    this.facetsOffset = this.facetsSpaceLength
      .reduce((acu, x) => [...acu, acu[acu.length - 1] + x + facetTitleAbsoluteSpace], [headerAbsoluteSpace])
  }
  getFacetTitleRange (facet) {
    return AxisRange.fromLen(this.getFacetOffset(facet), this.facetTitleSpace * this.axisLength)
  }
  getFacetRange (facet) {
    let facetId = this.facets.indexOf(facet)
    return new AxisRange(this.facetsOffset[facetId], this.facetsOffset[facetId + 1])
  }
  getGroupRange (facet, group) {
    let facetId = this.facets.indexOf(facet)
    let groupId = this.groups[facetId].indexOf(group)
    let insideOffset = groupId * this.groupLength + this.groupMargin
    return AxisRange.fromLen(this.getFacetTitleRange(facet).end + insideOffset, this.traces.length)
  }
  getPointRange (facet, group, trace) {
    let traceId = this.traces.indexOf(trace)
    return AxisRange.fromLen(this.getGroupRange(facet, group).start + traceId, 1)
  }
  getAxisRange (margin) {
    let absMargin = margin * this.axisLength
    return [-1 * absMargin, this.axisLength + absMargin]
  }
  getHeaderRange () {
    return new AxisRange(0, this.axisLength * this.headerSpace)
  }
  getAxisTicks () {
    let tmp = this.facets.map((facet, facetId) => {
      return { ticks: this.groups[facetId].map(group => this.getGroupRange(facet, group).mid), labels: this.groups[facetId] }
    })
    return { ticks: tmp.map(x => x.ticks).flat(), labels: tmp.map(x => x.labels).flat() }
  }
}

export default LolipopAxis
