### 1.1  Junit

是白盒测试的一种

**使用步骤**

1. 定义一个测试类(测试用例)

   ```
   建议:
   测试类名:被测试的类名Test
   		如：calculatorTest
   *包名: xxx.test 
   		如:cn. itcast. test
   ```

2. 定义测试方法:可以独立运行

   ```
   建议:
   方法名: test测试的方法名
   		如：testAdd()
   返回值: void
   参数列表:空参
   ```

3. 给方法加@Test

4. 导入junit依赖环境

**测试结果判断**

红色：成功

绿色：失败

一般采用断言（假设）的方法来判断结果是否达到预期。不满足预期就会返回一个错误
					Assert. assertEquals (期望的结果,运算的结果)

```java
import gedaye.Calculator;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CalculatorTest {
    @Before
    public void init(){
        System.out.println("init...");
    }

    @After
    public void close(){
        System.out.println("close...");
    }

    @Test
    public void testAdd(){
        Calculator  calculator = new Calculator();
        int result = calculator.add(2,2);
//        System.out.println(result);
        //采用断言的方法来测试结果,我断言结果为4
        Assert.assertEquals(4,result);
    }

    @Test
    public void testSub(){
        Calculator  calculator = new Calculator();
        int result = calculator.sub(1,2);
//        int[] arr = {1,2,3};
//        System.out.println(arr[4]);
        System.out.println("减法的结果是："+result);
    }
}
```

**注解补充:**

* @Before:
修饰的方法会在测试方法之前被自动执行
* @After:
修饰的方法会在测试方法执行之后自动被执行。（即使执行的方法出现异常）
