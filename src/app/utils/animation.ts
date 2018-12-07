import { animate, group, query, style, transition, trigger } from '@angular/animations';
declare var $: any;

export const trCompetDetail = transition('competitions => detailCompetition', [
  query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),

  group([
    query(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))
    ], {optional: true}),

    query(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.3s ease-in-out', style({transform: 'translateX(-100%)'}
      ))], {optional: true}),
  ])
]);

export const trCompetDetailReturn = transition('detailCompetition => competitions', [
  query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),

  group([
    query(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))
    ], {optional: true}),

    query(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.3s ease-in-out', style({transform: 'translateX(100%)'}
      ))], {optional: true}),
  ])
]);

export const trGeneral = transition('* <=> *', [
  query(
    ':enter',
    [style({opacity: 0})],
    {optional: true}
  ),
  query(
    ':leave',
    [style({opacity: 1}), animate('0.3s  ease-in-out', style({opacity: 0}))],
    {optional: true}
  ),
  query(
    ':enter',
    [style({opacity: 0}), animate('0.3s  ease-in-out', style({opacity: 1}))],
    {optional: true}
  )
]);

export class RouterAnimations {

  static routerSlide =
    trigger('routeSlide', [
      trCompetDetail
      , trCompetDetailReturn, trGeneral]);
}

export function animateTabs() {
  $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
    var $old_tab = $($(e.target).attr("href"));
    var $new_tab = $($(e.relatedTarget).attr("href"));


    if($new_tab.index() < $old_tab.index()){
      $old_tab.css('position', 'relative').css("right", "0").show();
      $old_tab.animate({"right":"-100%"}, 500, function () {
        $old_tab.css("right", 0).removeAttr("style");
      });
    }
    else {
      $old_tab.css('position', 'relative').css("left", "0").show();
      $old_tab.animate({"left":"-100%"}, 500, function () {
        $old_tab.css("left", 0).removeAttr("style");
      });
    }
  });

  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var $new_tab = $($(e.target).attr("href"));
    var $old_tab = $($(e.relatedTarget).attr("href"));

    if($new_tab.index() > $old_tab.index()){
      $new_tab.css('position', 'relative').css("right", "-2500px");
      $new_tab.animate({"right":"0"}, 500);
    }
    else {
      $new_tab.css('position', 'relative').css("left", "-2500px");
      $new_tab.animate({"left":"0"}, 500);
    }
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    // your code on active tab shown
  });
}

