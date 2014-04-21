/**
 * @file Highcharts plugin that shows the last points as columns near the y-Axis
 * Usage: Set showLastPoints: false in the yAxis options to disable.
 * Default: true
 *
 * @author Milton Mazzarri <milmazz@gmail.com>
 * @copyright Milton Mazzarri 2014
 */
(function (H) {
    "use strict";

    /**
     * @function showLastPoints
     *
     * @param {Object} chart - Represents the chart container.
     * @param {Object} group - Group that contains the rects per yAxis.
     */
    var showLastPoints = function (chart, group) {
        var yAxis = chart.yAxis,
            plotBox = chart.plotBox,
            renderer = chart.renderer,
            rect = {
                radius: 0,
                width: 5
            },
            counter = 1,
            points_length,
            last_point;

        group.add();

        H.each(yAxis, function (yAxis) {
            var showLastPoints = (yAxis.options.showLastPoints === undefined) ? true : yAxis.options.showLastPoints;

            if (showLastPoints) {
                for (var i = 0; i < yAxis.series.length; i++) {
                    if (yAxis.series[i].visible) {
                        points_length = yAxis.series[i].points.length;
                        last_point = yAxis.series[i].points[points_length - 1];

                        rect.x = counter + plotBox.x + plotBox.width + rect.width * (counter + 1);
                        rect.y = (last_point.plotY > 0) ? plotBox.y + last_point.plotY : plotBox.y;
                        rect.height = chart.chartHeight - yAxis.bottom - last_point.plotY - plotBox.y;

                        if (rect.height > 0) {
                            if (rect.height > plotBox.height) {
                                rect.height = plotBox.height;
                            }

                            renderer.rect(rect.x, rect.y, rect.width, rect.height, rect.radius)
                                .attr({
                                    fill: yAxis.series[i].color
                                })
                                .add(group);

                            counter = counter + 1;
                        }
                    }
                }
            }
        });
    };

    H.wrap(H.Chart.prototype, "init", function (proceed) {
        // Run the original proceed method
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this,
            group = chart.renderer.g("yaxis-last-points");

        showLastPoints(chart, group);

        H.addEvent(chart, "redraw", function () {
            group.destroy();
            group = chart.renderer.g("yaxis-last-points");
            showLastPoints(chart, group);
        });
    });

}(Highcharts));
