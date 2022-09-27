# Apach POI操作Excel

Apache POI是用 Java 编写的免费开源的跨平台的 Java API，Apache POI提供API给Java程序对Microsoft Office格式档案读和写的功能。(摘自[百度百科](https://baike.baidu.com/item/Apache%20POI/4242784))。

> 老规矩：
>
> 先上官方文档：https://poi.apache.org/

在实际的工作中，用代码操作Excel表格最常用的两种方式就是Apach POI和阿里巴巴的EasyExcel两种方式。本文主要介绍前者，使用POI来操作Excel。

## 1、使用前须知

#### Excel基本组成

平时我们使用Excel只关注与单元格中的数据。但在正式使用poi前，需要对Excel每个组成部分有一个充分的了解：

> 工作簿、工作表、单元行、单元格
>
> 它们的关系是依次包含的，前者包括后者

![image-20220629103857661](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/excel%E7%BB%84%E6%88%90%E7%BB%93%E6%9E%84.png)

#### Excel2003版本和2007版本的区别

Excel有很多的版本，最主要的划分两大类，2003及以前的泛成为Excel2003，2007年及以后的称为Excel2007

作为编程人员，要知道下面这两种区别:

| 版本      | 扩展名 | 最大行限制 | 最大列限制 |
| --------- | ------ | ---------- | ---------- |
| Excel2003 | xls    | 65536      | 256        |
| Excel2007 | xlsx   | 1048576    | 16384      |

> 注意：官方不这样称呼，只是为了区别两类，仅在本文中这样描述。

## 2、入门

POI操作Excel文件主要是使用以下两个类：

- HSSFWorkbook : 这个类有读取和和写入.xls 格式Microsoft Excel文件的方法。它与微软Office97-2003版本兼容。
- XSSFWorkbook : 这个类有读取和写入.xlsx格式Microsoft Excel文件和OpenOffice的XML文件的格式的方法。它与MS-Office版本2007或更高版本兼容。

依赖：

```xml
<!-- Excel2003版-->
<dependency>
   <groupId>org.apache.poi</groupId>
   <artifactId>poi</artifactId>
   <version>4.1.2</version>
</dependency>

<!--Excel 2007版-->
<dependency>
   <groupId>org.apache.poi</groupId>
   <artifactId>poi-ooxml</artifactId>
   <version>4.1.2</version>
</dependency>
```

测试：

```java
/**
* 测试03版本的excel
*/
@Test
public void testHSSFWorkbook() throws IOException {
   //创建工作簿
   Workbook workbook = new HSSFWorkbook();
   //创建工作表
   Sheet sheet1 = workbook.createSheet("工作表1");
   //创建第一行
   Row row1 = sheet1.createRow(0);
   //创建一个单元格(0,0)
   Cell cell = row1.createCell(0);
   cell.setCellValue("姓名");
   // 单元格(0,1)
   Cell cell1 = row1.createCell(1);
   cell1.setCellValue("学校名称");


   Row row2 = sheet1.createRow(1);
   //单元格(1,0)
   Cell cell2 = row2.createCell(0);
   cell2.setCellValue("王一");
   //单元格（1,1）
   Cell cell3 = row2.createCell(1);
   cell3.setCellValue("Tsinghua University");

   FileOutputStream fileOutputStream = new FileOutputStream("E:\\linshi\\HandleExcel\\poi\\src\\" + "人员信息表03版.xls");
   workbook.write(fileOutputStream);

}
```

生成的表格如下：

![image-20220629104027356](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/poi%E7%94%9F%E6%88%90%E7%9A%84excel03.png)



## 3、写数据



#### XSSFWorkbook写

在上一节中有提到XSSFWorkbook 对xlsx格式的表格进行处理。它的一些方法和HSSFWorkbook的基本一样。

```java
/**
     * 测试07版本的excel
     */
@Test
public void test2() throws IOException {
    //创建工作簿
    Workbook workbook = new XSSFWorkbook();
    //创建工作表
    Sheet sheet1 = workbook.createSheet("sheet1");
    Row row1 = sheet1.createRow(0);
    Cell cell = row1.createCell(0);
    cell.setCellValue("姓名");
    Cell cell1 = row1.createCell(1);
    cell1.setCellValue("学校名称");

    Row row2 = sheet1.createRow(1);
    Cell cell2 = row2.createCell(0);
    cell2.setCellValue("王二");
    Cell cell3 = row2.createCell(1);
    cell3.setCellValue("Peking University");

    FileOutputStream fileOutputStream = new FileOutputStream("E:\\JavaSource\\poi\\src\\main\\resources\\" + "人员信息表07版.xlsx");
    workbook.write(fileOutputStream);
}
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/poi生成的excel07.png)

#### 大数据量写时间比较：

当数据量比较大的时候 ，有两个工作簿类可以选择：一是普通的`XSSFWorkbook` ，二是`SXSSFWorkbook`。我们先通过一个多数据量的插入来比较两者需要的时间。大数据量的插入结果如下图。

![image-20220629150005387](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/Excel%E5%A4%A7%E6%95%B0%E6%8D%AE%E9%87%8F%E5%86%99%E5%85%A5%E6%B5%8B%E8%AF%95.png)

```java
/**
 * 测试XSSFWorkbook插入100000行数据
 */
@Test
public void testInsertBigData1() throws IOException {
    long begin = System.currentTimeMillis();
    Workbook workbook = new XSSFWorkbook();
    Sheet sheet1 = workbook.createSheet("大量数据");

    for (int rowNumber = 0; rowNumber < 100000; rowNumber++) {
        Row row = sheet1.createRow(rowNumber);
        for (int cellNumber = 0; cellNumber < 5; cellNumber++) {
            Cell cell = row.createCell(cellNumber);
            cell.setCellValue("填充数据");
        }

    }
    FileOutputStream fileOutputStream = new FileOutputStream("E:\\linshi\\HandleExcel\\poi\\src\\" + "XSSFWorkbook填充大量数据.xlsx");
    workbook.write(fileOutputStream);
    fileOutputStream.close();
    long end = System.currentTimeMillis();
    System.out.println("XSSFWorkbook填充花费的秒数："+(double)(end-begin)/1000);
}
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/XSSFWorkBook写入大数据量.png)

```java
/**
 * 测试SXSSFWorkbook插入100000行数据
 */
@Test
public void testInsertBigData2() throws IOException {
    long begin = System.currentTimeMillis();
    Workbook workbook = new SXSSFWorkbook();
    Sheet sheet1 = workbook.createSheet("大量数据");

    for (int rowNumber = 0; rowNumber < 100000; rowNumber++) {
        Row row = sheet1.createRow(rowNumber);
        for (int cellNumber = 0; cellNumber < 5; cellNumber++) {
            Cell cell = row.createCell(cellNumber);
            cell.setCellValue("填充数据");
        }

    }
    FileOutputStream fileOutputStream = new FileOutputStream("E:\\linshi\\HandleExcel\\poi\\src\\" + "SXSSFWorkbook快速填充大量数据.xlsx");
    workbook.write(fileOutputStream);
    fileOutputStream.close();
    //清理临时文件
    ((SXSSFWorkbook)workbook).dispose();

    long end = System.currentTimeMillis();
    System.out.println("SXSSFWorkbook快速填充花费的秒数："+(double)(end-begin)/1000);
}
```

![image-20220629150300863](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/XSSFWorkBook%E5%BF%AB%E9%80%9F%E5%86%99%E5%85%A5%E5%A4%A7%E6%95%B0%E6%8D%AE%E9%87%8F.png)

#### SXSSFWorkbook

SXSSFWorkbook专门处理大数据，对于大型excel的创建且不会内存溢出的。SXSSF 指定了rowAccessWindowSize ，每个sheet 对应一个临时文件，当行数大于rowAccessWindowSize 时，就会向临时文件中flush, 这样就保证了内存的低占用率。当行创建完，直接从临时文件中写入到Excel中。

> 1、rowAccessWindowSize 可以自定义，在初始化SXSSFWorkbook时，构造函数传入指定的整数
>
> 2、输入流之后，要清除生成的临时文件`((SXSSFWorkbook)workbook).dispose();`
>
> 3、像单元格合并类似的操作是纯内存操作，如果项目中想一次合并多行时，要注意随时观察自己机器内容的使用情况，避免出现OOM。

## 4、读数据

读取数据和写数据是相反的操作

1. 写数据时主要是createXX()来创建元素。
2. 读数据的时候主要是getXX()来获取元素。

下面关于读数据的操作基于下面这个样例表。

![image-20220629150448373](C:\Users\Admin\Pictures\typora\poi测试样例表.png)

#### 4.1直接读取

一般读取时指事先已经清楚每个单元格的数据类型。而且读取时不做非空判断。

```java
/**
     * 普通读数据
     * 已知数据类型
     * @throws IOException
     */
@Test
public void test() throws IOException {
    InputStream inputStream = new FileInputStream("E:\\JavaSource\\poi\\src\\main\\resources\\样例表.xlsx");
    Workbook workbook = new XSSFWorkbook(inputStream);
    Sheet sheet = workbook.getSheet("student");
    //获取第二行
    Row row = sheet.getRow(1);
    //获取序号
    int num = (int)row.getCell(0).getNumericCellValue();
    //获取姓名
    String name = row.getCell(1).getStringCellValue();
    //获取年龄
    int age = (int)row.getCell(2).getNumericCellValue();

    //获取身高
    double height = row.getCell(3).getNumericCellValue();
    //获取住址
    String address = row.getCell(4).getStringCellValue();
    //是否毕业
    boolean graduation = row.getCell(5).getBooleanCellValue();
    //生日
    Date birth = row.getCell(6).getDateCellValue();

    System.out.println(num);
    System.out.println(name);
    System.out.println(age);
    System.out.println(height);
    System.out.println(address);
    System.out.println(graduation);
    System.out.println(birth);
}
```

![image-20220629151909800](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/POI%E8%AF%BB%E5%8F%96%E4%B8%80%E8%A1%8C%E6%95%B0%E6%8D%AE.png)

> 可能存在的问题：
>
> 1、如果数据类型不对，会取不到数据
>
> 2、如果单元格为空，可能造成空指针异常

#### 4.2 读取前判断

读取单元格数据前，先对单元格是否为空判断并获取类型。根据类型调用不同的API方法。

```java
//读取时 非空判断，类型判断
@Test
public void readPro() throws Exception{
    InputStream inputStream = new FileInputStream("E:\\linshi\\HandleExcel\\poi\\src\\样例表.xlsx");
    Workbook workbook = new XSSFWorkbook(inputStream);

    Sheet sheet = workbook.getSheetAt(0);
    Row row = sheet.getRow(0);
    //获取该行的单元格数
    int count = row.getPhysicalNumberOfCells();
    for (int i = 0; i < count; i++) {
        Cell cell = row.getCell(i);
        if (cell!=null){
            CellType cellType = cell.getCellType();
            System.out.print(cellType+"\t");
        }
    }
    System.out.println();
    Row row1 = sheet.getRow(1);
    int count1 = row1.getPhysicalNumberOfCells();
    for (int i = 0; i < count1; i++) {
        Cell cell = row1.getCell(i);
        if (cell!=null){
            CellType cellType = cell.getCellType();
            System.out.print(cellType+"\t");
        }
    }

}
```

读取一行数据，并封装为List集合

```java
public static List<String> readOneRow(Sheet sheet, int rowNumber){
    List<String> list = new ArrayList<String>();
    Row row = sheet.getRow(rowNumber);
    if(Objects.isNull(row)){
        System.out.println("工作表中没有该行");
    }
    int totalRow = row.getPhysicalNumberOfCells();
    System.out.println("该行的数据数量："+totalRow);
    for (int i = 0; i <totalRow ; i++) {
        Cell cell = row.getCell(i);
        if (Objects.isNull(cell)){
            System.out.println("第"+i+"个单元格为空");
            list.add("");
            continue;
        }
        CellType cellType = cell.getCellType();
        String cellValue;

        if(cellType==CellType.STRING){
            cellValue = cell.getStringCellValue();
        } else if(cellType==CellType.NUMERIC){
            cellValue = cell.getNumericCellValue()+"";
        } else if(cellType == CellType.BOOLEAN){
            cellValue = cell.getBooleanCellValue()+"";
        } else {
            cellValue = "";
        }
        list.add(cellValue);

    }

    return list;
}
```











## 5、POI中的元素是否是单例的吗？

先看一个写数据时的问题

![image-20220629173922557](C:\Users\Admin\Pictures\typora\POI写入数据的问题.png)

![image-20220629173829997](C:\Users\Admin\Pictures\typora\image-20220629173829997.png)

> 原因分析：
>
> 在写入数据的时候，两次创建了第一行`sheet1.createRow(0)`和第二行`sheet1.createRow(1)`
>
> 在第二次创建的Row会覆盖掉第一次的。因此（0,0）和(1,0)坐标的数据会丢失。
>
> 下面代码的会解决上面的问题：
>
> ```java
> //在第二次时改为get获取，而不是创建
>     sheet1.createRow(0).createCell(0).setCellValue("姓名");
>     sheet1.geteRow(0).createCell(1).setCellValue("学校名称");
> 
>     sheet1.createRow(1).createCell(0).setCellValue("tom");
>     sheet1.geteRow(1).createCell(1).setCellValue("HFUU");
> ```



**测试创建同名的Sheet**

```java
@Test
public void testSingle(){
    Workbook workbook = new XSSFWorkbook();
    Sheet aaa = workbook.createSheet("aaa");
    Sheet aaa1 = workbook.createSheet("aaa");
    System.out.println(aaa==aaa1);
}
```

![image-20220629174807042](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220629174807042.png)

> 会直接抛出异常。提示同名的Sheet工作表已经存在



**测试创建同名的Row和Cell**

```java
@Test
public void test3(){
    Workbook workbook = new XSSFWorkbook();
    Sheet sheet = workbook.createSheet("aaa");
    Row row = sheet.createRow(0);
    Row row1 = sheet.createRow(0);
    System.out.println(row==row1);

    Cell cell = row.createCell(0);
    Cell cell2 = row.createCell(0);
    System.out.println(cell==cell2);
}
```

![image-20220629175822516](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220629175822516.png)

**说明**

从上面的两个例子来看，Sheet能保证单例，但Row和Cell不是单例的。