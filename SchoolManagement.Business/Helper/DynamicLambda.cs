using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Business.Helper
{
    public static class DynamicLambda
    {
        public static Expression ContainesExpression(ParameterExpression param, string property, List<string> values)
        {
            var member = Expression.PropertyOrField(param, property);
            var constant = Expression.Constant(values, typeof(List<string>));
            var expression = Expression.Call(constant, "Contains", null, member);
            return expression;
        }

        public static Expression EqualExpression(ParameterExpression param, string property, string values)
        {
            var member = Expression.PropertyOrField(param, property);
            var constant = Expression.Constant(values, typeof(string));
            var expression = Expression.Equal(member, constant);
            return expression;
        }
    }
}
